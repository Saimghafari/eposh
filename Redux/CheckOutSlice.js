import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const loadCheckOutFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("checkOut");
    return data
      ? JSON.parse(data)
      : {
          email: "",
          firstName: "",
          lastName: "",
          address: "",
          city: "",
          postal: "",
          contactNo: "",
          sameAsShipping: true,
        };
  } catch {
    return {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postal: "",
      contactNo: "",
      sameAsShipping: true,
    };
  }
};


const saveCheckOutToLocalStorage = (userDetails) => {
  localStorage.setItem("checkOut", JSON.stringify(userDetails));
};

// Save order to localStorage and generate order number
const saveOrderToLocalStorage = (order) => {
  try {
    const existingOrders = localStorage.getItem("orders");
    const orders = existingOrders ? JSON.parse(existingOrders) : [];

    const year = new Date().getFullYear();
    const yearOrders = orders.filter((o) =>
      o.orderNumber?.includes(`ORD-${year}`)
    );
    const nextOrderNum = yearOrders.length + 1;
    const paddedNumber = String(nextOrderNum).padStart(3, "0");
    const orderNumber = `ORD-${year}-${paddedNumber}`;

    const orderWithNumber = { ...order, orderNumber };
    orders.push(orderWithNumber);
    localStorage.setItem("orders", JSON.stringify(orders));

    return orderWithNumber;
  } catch (error) {
    console.error("Error saving order to localStorage:", error);
    return order;
  }
};


export const checkOut = createAsyncThunk(
  "checkOut/process",
  async ({ cartItems, userDetails }, thunkAPI) => {
    try {
      if (!cartItems?.length) {
        return thunkAPI.rejectWithValue(
          "Cart is empty. Add items before checking out."
        );
      }

      const requiredFields = [
        "email",
        "firstName",
        "lastName",
        "address",
        "contactNo",
        "city",
      ];
      const missingField = requiredFields.find((field) => !userDetails[field]);

      if (missingField) {
        return thunkAPI.rejectWithValue(
          `Please fill the ${missingField
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()}.`
        );
      }

      const total = cartItems
        .reduce((sum, item) => {
          const price = parseFloat(item.price) || 0;
          const quantity = item.quantity || 1;
          return sum + price * quantity;
        }, 0)
        .toFixed(2);

      const totalQuantity = cartItems.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
      );

      const newOrder = {
        cartItems,
        userDetails,
        total,
        totalQuantity,
        createdAt: new Date().toISOString(),
      };

      saveCheckOutToLocalStorage(userDetails);

      const orderWithNumber = saveOrderToLocalStorage(newOrder); //  assign order number & save
      return orderWithNumber;
    } catch (error) {
      return thunkAPI.rejectWithValue("Unexpected error occurred.");
    }
  }
);


const initialState = {
  status: "idle",
  error: null,
  userDetails: loadCheckOutFromLocalStorage(),
  order: null,
};


const checkOutSlice = createSlice({
  name: "checkOut",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = { ...state.userDetails, ...action.payload };
      saveCheckOutToLocalStorage(state.userDetails);
    },
    resetCheckout: (state) => {
      state.order = null;
      state.status = "idle";
      state.error = null;
      state.userDetails = {
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postal: "",
        contactNo: "",
        sameAsShipping: true,
      };
      localStorage.removeItem("checkOut");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkOut.pending, (state) => {
        state.status = "processing";
        state.error = null;
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        state.status = "success";
        state.order = action.payload; // saved order with orderNumber
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload || "Checkout failed";
      });
  },
});

export const { setUserDetails, resetCheckout } = checkOutSlice.actions;
export default checkOutSlice.reducer;