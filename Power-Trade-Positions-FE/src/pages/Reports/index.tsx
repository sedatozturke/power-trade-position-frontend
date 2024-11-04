import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useLazyGetReportsQuery } from '../../services/reports/api'
import Table from '../../components/Table';
import { useNavigate } from 'react-router-dom';

const ReportsList = () => {
  const [ fetchReports, { data, isLoading}] = useLazyGetReportsQuery();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchReports(searchText);
  }, [])
  

  const handleSearchChange = (e: any) => setSearchText(e.target.value);
  const onSearch = () => {
    fetchReports(searchText);
  }

  const navigate = useNavigate();
  return (
    <Layout loading={isLoading}>
      <div className="flex items-center mb-4">
        <h1 className="text-3xl font-semibold text-gray-800 flex-1">Day Ahead Reports</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
          className="px-4 border border-gray-300 rounded-l-md rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          style={{paddingTop: 7, paddingBottom: 7}}
        />
        <button
          onClick={onSearch}
          className={`rounded-r-md rounded-l-none focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-800 hover:bg-gray-600 text-white px-4 py-2`}
        >
          Search
        </button>
      </div>
      <Table>
        <Table.Head>
          <Table.Header>ID</Table.Header>
          <Table.Header>Name</Table.Header>
          <Table.Header>Type</Table.Header>
          <Table.Header>Report Date</Table.Header>
          <Table.Header>Extraction Date(UTC)</Table.Header>
        </Table.Head>
        <Table.Body>
          {data && data.length > 0 ? data.map((report) => (
            <Table.Row key={report.id} onRowSelected={() => navigate(`/reports/${report.id}`)}>
              <Table.Cell>{report.id}</Table.Cell>
              <Table.Cell>{report.name}</Table.Cell>
              <Table.Cell>{report.type}</Table.Cell>
              <Table.Cell>{new Date(report.reportDate).toLocaleDateString('es-ES')}</Table.Cell>
              <Table.Cell>{new Date(report.triggerDateUTC).toLocaleString('es-ES')}</Table.Cell>
            </Table.Row>
          )) : (
            <tr>
              <td colSpan={100} className="text-center py-4 text-gray-500">
                {"No data available"}
              </td>
            </tr>
          )}
        </Table.Body>
      </Table>
    </Layout>
  )
}

export default ReportsList