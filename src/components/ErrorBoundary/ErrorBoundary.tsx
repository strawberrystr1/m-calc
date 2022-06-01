import { Component, ReactNode } from 'react'
import { ErrorWrapper } from './components'

type Props = {
  children: ReactNode
  fallback: string
}

type State = {
  error: boolean
}

export default class ErrorBoundary extends Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props)

    this.state = {
      error: false,
    }
  }

  static getDerivedStateFromError() {
    return {
      error: true,
    }
  }

  render() {
    const { error } = this.state
    const { fallback, children } = this.props
    if (error) {
      return <ErrorWrapper>{fallback}</ErrorWrapper>
    }
    return children
  }
}
