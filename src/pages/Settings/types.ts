import { ChangeEvent } from 'react'

export type HandleChange<T> = (e: ChangeEvent<T>) => void
