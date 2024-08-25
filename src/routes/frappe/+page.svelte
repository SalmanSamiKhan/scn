<script lang="ts">
    // @ts-ignore
    import { onMount } from 'svelte';
    import 'frappe-datatable/dist/frappe-datatable.css';
    import DataTable from 'frappe-datatable';
  
    let table;
  
    const columns = [
      { id: 'name', name: 'Name', editable: true },
      { id: 'position', name: 'Position', editable: true },
      { id: 'office', name: 'Office' },
      { id: 'age', name: 'Age', align: 'right' },
      { id: 'start_date', name: 'Start Date' },
      { id: 'salary', name: 'Salary', align: 'right', editable: true },
      { id: 'actions', name: 'Actions', format: rowActionButtons }  // Custom cell formatting
    ];
  
    let data = [
      { name: 'John Doe', position: 'Developer', office: 'New York', age: 30, start_date: '2018/01/01', salary: '$2000' },
      { name: 'Jane Doe', position: 'Designer', office: 'San Francisco', age: 25, start_date: '2019/02/15', salary: '$3000' },
      // Add more rows as needed
    ];
  
    let options = {
      columns: columns,
      data: data,
      inlineFilters: true,
      layout: 'fluid',
      pagination: {
        pageSize: 10,
        pageNumber: 1
      },
      sortIndicator: 'right',
      checkboxColumn: true,
      noDataMessage: 'No records found',
      freezeColumn: 2,  // Freeze first two columns
      enableSearch: true,  // Enable global search
      events: {
        onCheckRow: (row) => {
          console.log('Row checked:', row);
        },
        onEditCell: (cell, newValue) => {
          console.log('Cell edited:', cell, 'New value:', newValue);
        }
      }
    };
  
    function rowActionButtons(cell, row) {
      return `
        <button class="btn btn-sm btn-primary" onclick="alert('View ${row.name}')">View</button>
        <button class="btn btn-sm btn-danger" onclick="alert('Delete ${row.name}')">Delete</button>
      `;
    }
  
    onMount(() => {
      table = new DataTable('#datatable', options);
  
      // Export to CSV functionality
      document.getElementById('export-btn').addEventListener('click', () => {
        table.exportCSV();
      });
    });
  
    // Dynamically updating data
    function updateData(newData) {
      table.refresh(newData);
    }
  
    // Example: Update data after 5 seconds
    setTimeout(() => {
      data = [
        { name: 'Alice', position: 'Manager', office: 'Chicago', age: 35, start_date: '2020/03/12', salary: '$4000' },
        { name: 'Bob', position: 'Engineer', office: 'Boston', age: 28, start_date: '2021/04/10', salary: '$3500' },
      ];
      updateData(data);
    }, 5000);
  </script>
  
  <style>
    /* Custom styles for the data table */
    .frappe-datatable th {
      background-color: #007bff;
      color: white;
      text-align: center;
    }
  
    .frappe-datatable td {
      text-align: center;
    }
  
    .btn {
      margin: 0 5px;
      padding: 5px 10px;
      border: none;
      color: white;
      border-radius: 3px;
      cursor: pointer;
    }
  
    .btn-primary {
      background-color: #007bff;
    }
  
    .btn-danger {
      background-color: #dc3545;
    }
  
    #datatable-container {
      padding: 20px;
      background-color: #f8f9fa;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  
    #export-btn {
      margin-top: 10px;
      padding: 5px 15px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    }
  
    #export-btn:hover {
      background-color: #218838;
    }
  </style>
  
  <div id="datatable-container">
    <div id="datatable"></div>
    <button id="export-btn">Export to CSV</button>
  </div>
  