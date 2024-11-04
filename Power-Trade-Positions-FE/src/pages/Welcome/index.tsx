import React from 'react'
import Layout from '../../components/Layout'

export default function Welcome() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center" style={{minHeight: '80vh'}}>
        <h1 className="text-8xl text-gray-800">
          Hello!
        </h1>
        <h2 className="text-2xl text-gray-500">
          First of all, thank you for your time to inspect this project.
        </h2>
        <h3 className="text-l text-gray-500 mt-5">
          This project works together with <b>PowerTradePosition.Reporting</b> and <b>PowerTradePosition.API</b>.
        </h3>
        <h3 className="text-l text-gray-500">
          Please first run PowerTradePosion.Reporting console application to create some reports.
        </h3>
        <h3 className="text-l text-gray-500">
          Run PowerTradePosition.API to serve the reports. This app expects API on: 'http://localhost:5045'
        </h3>
      </div>
    </Layout>
  )
}
