import { useRouter } from 'next/router'
import React from 'react'

const StoreDetailPage = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  return <div>StoreEditPage {id}</div>
}

export default StoreDetailPage
