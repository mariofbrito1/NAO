import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Avatar, Button } from '@material-ui/core';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { green } from '@mui/material/colors';

export const ExportToExcel = ({ title, apiData, fileName }) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  
  const exportToCSV = (apiData, fileName) => {
  
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <Button color="primary" onClick={e => exportToCSV(apiData, fileName)}>
        <Avatar sx={{ bgcolor: green[500] }} style={{ margin: '8px' }}>
          <AssignmentIcon />
        </Avatar>{' '}
        {title}
      </Button>
    </>
  );
};
