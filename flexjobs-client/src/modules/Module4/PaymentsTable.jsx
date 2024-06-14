import React, { useState, useEffect } from 'react';

const PaymentsTable = ({ projects }) => {
  const [usernames, setUsernames] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);
  

  const getUserNameById = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/Payments/getUserNameById/${userId}`);
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const newProjects = projects.filter(project => {
      const projectDate = new Date(project.completionDate ? project.completionDate : project.createdAt);
      if (startDate && projectDate < new Date(startDate)) return false;
      if (endDate && projectDate > new Date(endDate)) return false;
      console.log(startDate, endDate)
      return true;
    });
  
    setFilteredProjects(newProjects); // Use the state here
    console.log('filtered projects', newProjects)
  }, [projects, startDate, endDate]);

  useEffect(() => {
    const fetchUsernames = async () => {
      const newNames = {};
      const promises = projects.map(async project => {
        const username = await getUserNameById(project.clientId);
        newNames[project.clientId] = username;
        return username; // Return the promise here
      });
  
      await Promise.all(promises);
      setUsernames(newNames);
    };
  
    fetchUsernames();
  }, [projects]);



  return (
    <div className="content-wrapper table-payments my-4">
      <div className="card card-rounded">
        {/* Filter part */}
        <div id="filter-section">
          <span className="me-2">Filter by:</span>
        </div>
        <div className="card-header d-flex justify-content-between align-items-center filter-content">
          <div className="tw-flex tw-items-center">
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <span className="tw-mx-4">Start date</span>
              <input aria-label="start date" type="date" className="tw-bg-white tw-text-black" onChange={e => setStartDate(e.target.value)}/>
              <span className="tw-mx-4">End date</span>
              <input aria-label="end date" type="date" className="tw-bg-white tw-text-black" onChange={e => setEndDate(e.target.value)} />
          </div>
            {/* <div className="filter-icon">
              <i className="fa-solid fa-sliders"></i>
              <button type="button" className="btn btn-sm ms-3">Filters</button>
            </div> */}
          </div>
          {/* <button className="btn btn-success btn-sm btn-rounded">Download invoices</button> */}
        </div>
        {/* payment data */}
        <div className="container-payments">
          <div className="card-body p-0">
            <table id='table-data-payments' className="table table-group-divider tw-mb-0 tw-border-t-0">
              <thead id="invoice-table-head">
                <tr className="table-warning">
                  <th style={{paddingLeft: "16px"}}>Date</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>From</th>
                  <th>Balance</th>
                  <th>Reference ID</th>
                </tr>
              </thead>
              {/* payment table data */}
                <tbody id='table-data-payments'>
                    {filteredProjects?.map(project => (
                        <tr key={project._id}>
                            <td style={{paddingLeft: "16px"}}>
                            {
                              project.completionDate 
                                ? new Date(project.completionDate).toLocaleDateString() 
                                : new Date(project.createdAt).toLocaleDateString()
                            }
                            </td>
                            <td>{project.paymentStatus}</td>
                            <td>{project.title}</td>
                            <td>{usernames[project.clientId]}</td>
                            {/* <td>{ project.freelancerId}</td> */}
                            <td className="text-success">+RM{project.totalAmountPaid}</td>
                            <td>
                                <a href={project.pdfLink} target="_blank">{project._id}</a>
                            </td>
                        </tr>
                    ))}
                    {/* <tr>
                        <td className="first-column">Apr 5, 2024</td>
                        <td>Cash payment</td>
                        <td>Order</td>
                        <td>micheal</td>
                        <td className="text-success">+RM200.00</td>
                        <td>
                            <a href="./images/invoice_FRE1020150.pdf" target="_blank">FRE1020200</a>
                        </td>
                    </tr>
                    <tr>
                        <td className="first-column">Mar 29, 2024</td>
                        <td>Cash payment</td>
                        <td>Application Design</td>
                        <td>micheal</td>
                        <td className="text-success">+RM1000.00</td>
                        <td>
                            <a href="./images/invoice_FRE1020150.pdf" target="_blank">FRE1020150</a>
                        </td>
                    </tr> */}
                </tbody>
                {/* pagination */}
              <tfoot id='table-data-payments-footer'>
                <tr>
                  <td colSpan="6" className="pt-3 pb-0">
                    <nav aria-label="Page navigation example" className="d-flex justify-content-end">
                      <ul className="pagination justify-content-center">
                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
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