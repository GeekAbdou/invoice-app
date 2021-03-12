import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Store from 'store'
import data from '../data/data.json'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }) {
	const router = useRouter()
	const [invoices, setInvoices] = useState(null)

	useEffect(() => {
		if (Store.get('invoices') === undefined) {
			Store.set('invoices', data)
		}
		setInvoices(Store.get('invoices'))
	}, [setInvoices])

	function deleteInvoice(id, invoices, setInvoices) {
		const newInvoices = invoices.filter((invoice) => {
			return id !== invoice.id
		})
		setInvoices(newInvoices)
		Store.set('invoices', newInvoices)
	}

	function handleDelete(id) {
		router.push('/')
		deleteInvoice(id, invoices, setInvoices)
	}

	return (
		<>
			<Head>
				<link rel="icon" href="/images/favicon-32x32.png" type="image/icon"/>
			</Head>
			<Layout>
				<Component 
					{...pageProps} 
					invoices={invoices} 
					setInvoices={setInvoices} 
					handleDelete={handleDelete}
				/>
			</Layout>
		</>
	)
}