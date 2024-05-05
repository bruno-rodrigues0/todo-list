import * as addItem from './addItem'
import * as updateItem from './updateItem'
import * as getItems from './getItems'
import * as deleteItem from './deleteItem'

export const todoListController = {
    ...addItem,
    ...getItems,
    ...updateItem,
    ...deleteItem
}