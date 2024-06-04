import React from 'react';

const PaymentsTable = () => {
  return (
    <div class="content-wrapper my-4">
      <div class="card card-rounded">
        <div id="filter-section">
          <span class="me-2">Filter by:</span>
        </div>
        <div class="card-header d-flex justify-content-between align-items-center filter-content">
          <div class="d-flex align-items-center">
            <div class="input-icon">
              <input aria-label="date" type="text" class="form-control form-control-sm" value="Mar 1, 2024 - Apr 10, 2024" readonly/>
              <i class="fa-regular fa-calendar"></i>
            </div>
            <div class="filter-icon">
              <i class="fa-solid fa-sliders"></i>
              <button type="button" class="btn btn-sm ms-3">Filters</button>
            </div>
          </div>
          <button class="btn btn-success btn-sm btn-rounded">Download invoices</button>
        </div>
        <div class="container">
          <div class="card-body p-0">
            <table class="table table-group-divider mb-0" style={{borderTop: "none"}}>
              <thead id="invoice-table-head">
                <tr class="table-warning">
                  <th class="first-column">Date</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>From</th>
                  <th>Balance</th>
                  <th>Reference ID</th>
                </tr>
              </thead>
                <tbody>
                    <tr>
                        <td class="first-column">Apr 5, 2024</td>
                        <td>Cash payment</td>
                        <td>Order</td>
                        <td>micheal</td>
                        <td class="text-success">+RM200.00</td>
                        <td>
                            <a href="./images/invoice_FRE1020150.pdf" target="_blank">FRE1020200</a>
                        </td>
                    </tr>
                    <tr>
                        <td class="first-column">Mar 29, 2024</td>
                        <td>Cash payment</td>
                        <td>Application Design</td>
                        <td>micheal</td>
                        <td class="text-success">+RM1000.00</td>
                        <td>
                            <a href="./images/invoice_FRE1020150.pdf" target="_blank">FRE1020150</a>
                        </td>
                    </tr>
                </tbody>
              <tfoot>
                <tr>
                  <td colspan="6" class="pt-3 pb-0">
                    <nav aria-label="Page navigation example" class="d-flex justify-content-end">
                      <ul class="pagination justify-content-center">
                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                      </ul>
                    </nav>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsTable;