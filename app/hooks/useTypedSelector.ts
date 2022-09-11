import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { RootSate } from './../store/index'

export const useTypedSelector: TypedUseSelectorHook<RootSate> = useSelector
