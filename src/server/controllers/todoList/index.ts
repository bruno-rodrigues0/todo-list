import * as addItem from './addItem'
import * as updateItem from './updateItem'
import * as getItems from './getItems'

export const todoListController = {
    ...addItem,
    ...getItems,
    ...updateItem
}