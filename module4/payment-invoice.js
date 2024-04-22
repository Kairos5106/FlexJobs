document.addEventListener("DOMContentLoaded", function () {
  var switchButton = document.querySelector(".switch-button");
  if (switchButton) {
    switchButton.addEventListener("click", function () {
      if (window.location.href.endsWith("payment-invoice.html")) {
        window.location.href = "payment-invoice-buyer.html";
      } else if (window.location.href.endsWith("payment-invoice-buyer.html")) {
        window.location.href = "payment-invoice.html";
      }
    });
  }
});

var tableData = [
  {
    date: "Apr 5, 2024",
    paymentType: "Cash payment",
    description: "Order",
    user: "micheal",
    amount: "-RM200.00",
    invoice: "FRE1020200",
  },
  {
    date: "Mar 29, 2024",
    paymentType: "Cash payment",
    description: "Application Design",
    user: "micheal",
    amount: "-RM1000.00",
    invoice: "FRE1020150",
  },
  {
    date: "Mar 22, 2024",
    paymentType: "Cash payment",
    description: "Order",
    user: "micheal",
    amount: "-RM500.00",
    invoice: "FRE1020103",
  },
  {
    date: "Mar 15, 2024",
    paymentType: "Cash payment",
    description: "Order",
    user: "micheal",
    amount: "-RM500.00",
    invoice: "FRE1020102",
  },
  {
    date: "Mar 8, 2024",
    paymentType: "Cash payment",
    description: "Order",
    user: "micheal",
    amount: "-RM500.00",
    invoice: "FRE1020101",
  },
  {
    date: "Mar 1, 2024",
    paymentType: "Cash payment",
    description: "Order",
    user: "micheal",
    amount: "-RM500.00",
    invoice: "FRE1020100",
  },
];

document.getElementById("page1").addEventListener("click", function () {
  // Change table content for page 1
});

document.getElementById("page2").addEventListener("click", function () {
  // Change table content for page 2
});

document.getElementById("page3").addEventListener("click", function () {
  // Change table content for page 3
});

document.getElementById("prev").addEventListener("click", function () {
  // Go to the previous page
});

document.getElementById("next").addEventListener("click", function () {
  // Go to the next page
});

// Get the table body where you want to add the rows
var tableBody = document.querySelector("#transaction-body");

// Loop over the array of data
tableData.forEach(function (rowData) {
  // Create a new table row
  var row = document.createElement("tr");

  // Create a new cell for each property in the data
  for (var property in rowData) {
    var cell = document.createElement("td");
    cell.textContent = rowData[property];
    row.appendChild(cell);
  }

  // Add the row to the table
  tableBody.appendChild(row);
});
