import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { FC, ReactNode } from 'react'

export type LayoutProps = {
  children: ReactNode
}

export type Page<T = {}> = NextPage<T> & {
  Layout?: FC<LayoutProps>
  requiredAuth?: boolean
}

export type CustomAppProps = AppProps & {
  Component: Page
}
