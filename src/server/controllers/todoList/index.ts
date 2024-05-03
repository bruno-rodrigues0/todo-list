import * as addItem from './addItem'
import * as getItems from './getItems'

export const todoListController = {
    ...addItem,
    ...getItems
}