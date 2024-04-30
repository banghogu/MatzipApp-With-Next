import { useRouter } from 'next/router'
import React from 'react'

const StoreEditPage = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  return <div>StoreEditPage {id}</div>
}

export default StoreEditPage
