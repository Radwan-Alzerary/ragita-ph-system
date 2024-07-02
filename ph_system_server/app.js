const express = require("express");
const path = require("path");

const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");

const vaultService = require("./services/vaultOperations")
const app = express();
const port = process.env.PORT || 5000;
app.use(compression());
app.use(morgan("dev"));

require("dotenv").config();
require("./config/database");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const Storge = require("./model/storge");
const PaymentType = require("./model/PaymentType");
const Customer = require("./model/constermers");
const RequestQueue = require("./model/requestQueue");

// const Visitor = require('./models/visitor');

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//use flash
app.use(flash());

app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Check if there are any documents in the Storge collection
const defaultStorgeData = [
  { name: "مخزن المعدات", defult: false },
  { name: "مخزن الادويه", defult: true },
];

Storge.countDocuments()
  .then((count) => {
    if (count === 0) {
      // Create default documents using a forEach loop
      defaultStorgeData.forEach((storgeItem, index) => {
        const defaultStorge = new Storge(storgeItem);
        defaultStorge
          .save()
          .then(() => {
            console.log(`Default Storge ${index + 1} created.`);
          })
          .catch((err) => {
            console.error(`Error creating default Storge ${index + 1}:`, err);
          });
      });
    }
  })
  .catch((err) => {
    console.error("Error checking Storge collection:", err);
  });

// An array of default PaymentType data
const defaultPaymentTypeData = [{ name: "نقدي" }, { name: "اجل" }];

PaymentType.countDocuments()
  .then((count) => {
    if (count === 0) {
      // Create default documents using a forEach loop
      defaultPaymentTypeData.forEach((paymentTypeItem, index) => {
        const defaultPaymentType = new PaymentType(paymentTypeItem);
        defaultPaymentType
          .save()
          .then(() => {
            console.log(`Default PaymentType ${index + 1} created.`);
          })
          .catch((err) => {
            console.error(
              `Error creating default PaymentType ${index + 1}:`,
              err
            );
          });
      });
    }
  })
  .catch((err) => {
    console.error("Error checking PaymentType collection:", err);
  });

// An array of default Customer data
const defaultCustomerData = [{ name: "زبون عام", phoneNumber: "07" }];

async function initialize() {
  try {
    await vaultService.initializeVault();
  } catch (err) {
    console.error('Error initializing vault:', err);
    // Handle error appropriately, such as retrying or exiting the server
    process.exit(1); // Exit with error status
  }
}
initialize()

Customer.countDocuments()
  .then((count) => {
    if (count === 0) {
      // Create default documents using a forEach loop
      defaultCustomerData.forEach((customerItem, index) => {
        const defaultCustomer = new Customer(customerItem);
        defaultCustomer
          .save()
          .then(() => {
            console.log(`Default Customer ${index + 1} created.`);
          })
          .catch((err) => {
            console.error(`Error creating default Customer ${index + 1}:`, err);
          });
      });
    }
  })
  .catch((err) => {
    console.error("Error checking Customer collection:", err);
  });

RequestQueue.countDocuments()
  .then((count) => {
    if (count === 0) {
      // Create default documents
      const defaultRequestQueue = new RequestQueue({
        number: 1,
      });
      // Save the default documents to the database
      defaultRequestQueue
        .save()
        .then(() => {
          console.log("Default RequestQueue created.");
        })
        .catch((err) => {
          console.error("Error creating RequestQueue :", err);
        });
    }
  })
  .catch((err) => {
    console.error("Error checking Storge collection:", err);
  });

app.use(require("./routes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
