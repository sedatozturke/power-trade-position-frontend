import Layout from '../../components/Layout'

export default function Error404() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center" style={{minHeight: '80vh'}}>
        <h1 className="text-8xl text-gray-800">
          404
        </h1>
        <h2 className="text-4xl text-gray-500">
          Page Not Found
        </h2>
      </div>
    </Layout>
  )
}