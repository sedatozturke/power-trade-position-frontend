import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Layout from '../../../components/Layout';
import { useGetReportDetailQuery, useGetReportsQuery, useLazyGetComparisonReportDetailQuery } from '../../../services/reports/api';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import { IReportDetail } from '../../../services/reports/response';

const ReportDetail = () => {
  const { id } = useParams();
  const { data: reportDetail, isLoading: isReportDetailLoading, isError } = useGetReportDetailQuery(id!)
  const { data: reports } = useGetReportsQuery('')
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [comparisonMode, setComparisonMode] = useState<boolean>(false);
  const [getComparedReport, { data: comparedData, isLoading: isComparedDataLoading }] = useLazyGetComparisonReportDetailQuery();

  function onComparisonSelected(id: string) {
    setIsCompareModalOpen(false);
    setComparisonMode(true);
    getComparedReport(id);
  }

  const onComparisonButtonClicked = () => {
    if (comparisonMode) {
      setComparisonMode(false);
    } else if (!isCompareModalOpen) {
      setIsCompareModalOpen(true);
    }
  }

  if (isError) {
    return (
      <Layout activePage="reports">
      <div className="flex flex-col items-center justify-center" style={{minHeight: '80vh'}}>
        <h2 className="text-4xl text-gray-800">
          Report Not Found
        </h2>
      </div>
    </Layout>
    )
  }

  const renderDetailTable = (reportDetail: IReportDetail | undefined, isSingle: boolean) => {
    return (
      <div className="flex-1">
        <Table>
          <Table.Head>
            <Table.Header classNameExtension={`${isSingle ? 'w-4/5' : ''}`}>Period (UTC Time)</Table.Header>
            <Table.Header>Volume</Table.Header>
          </Table.Head>
          <Table.Body>
            {reportDetail ? reportDetail.powerVolumes.map((powerVolumes) => (
              <Table.Row key={powerVolumes.periodTime.toString()}>
                <Table.Cell classNameExtension={`${isSingle ? 'w-4/5' : ''}`}>{new Date(powerVolumes.periodTime).toISOString()}</Table.Cell>
                <Table.Cell>{powerVolumes.volume}</Table.Cell>
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
      </div>
    )
  }

  const renderComparisonTable = (reportDetail: IReportDetail | undefined, isSingle: boolean) => {
    return (
      <div className="flex-1">
        <Table>
          <Table.Head>
            <Table.Header classNameExtension={`${isSingle ? 'w-4/5' : ''}`}>Period (UTC Time)</Table.Header>
            <Table.Header>Volume</Table.Header>
          </Table.Head>
          <Table.Body>
            {reportDetail && reportDetail.powerVolumes?.length > 0 ? reportDetail.powerVolumes.map((powerVolumes) => (
              <Table.Row key={powerVolumes.periodTime.toString()}>
                <Table.Cell classNameExtension={`${isSingle ? 'w-4/5' : ''}`}>{new Date(powerVolumes.periodTime).toISOString()}</Table.Cell>
                <Table.Cell>{powerVolumes.volume}</Table.Cell>
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
      </div>
    )
  }

  return (
    <Layout activePage="reports" loading={isReportDetailLoading}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold text-gray-800">{`Report Detail: ${id} ${comparisonMode && comparedData ? `- ${comparedData?.id}` : ''}`}</h1>
        <button
          onClick={onComparisonButtonClicked}
          className={`rounded focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-800 hover:bg-gray-600 text-white px-4 py-2`}
        >
          {comparisonMode ? 'Stop Comparing' : 'Compare'}
        </button>
      </div>
      <div className="flex flex-row space-x-4">
        {comparisonMode ?
          <>
            {renderDetailTable(reportDetail, false)}
            {renderComparisonTable(comparedData, false)}
          </>
          :
          renderDetailTable(reportDetail, true)
        }
      </div>
      <Modal title="Select a report to compare" isOpen={isCompareModalOpen} onClose={() => setIsCompareModalOpen(false)}>
        <Table>
          <Table.Head>
            <Table.Header>Reports</Table.Header>
          </Table.Head>
          <Table.Body>
            {reports ? reports.map((report) => (
              <Table.Row key={report.id} onRowSelected={() => onComparisonSelected(report.id)}>
                <Table.Cell>{report.name}</Table.Cell>
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
      </Modal>
    </Layout>
  )
}

export default ReportDetail;