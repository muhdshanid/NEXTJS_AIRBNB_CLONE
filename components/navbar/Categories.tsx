"use client"

import Container from '../Container'
import { categories } from '@/constants'
import CategoryBox from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get("category")
  const pathname = usePathname()

  const isMainPage = pathname  === "/"
  if(!isMainPage) return null
  return (
    <Container>
        <div className="pt-4 flex items-center justify-between overflow-x-auto">
            {
                categories.map(cat => (
                    <CategoryBox label={cat.label}
                    icon={cat.icon} selected={cat.label === category}  key={cat.label}/>
                ))
            }
        </div>
    </Container>
  )
}

export default Categories