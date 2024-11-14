import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import { Fragment, HTMLAttributes, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { animations } from '@formkit/drag-and-drop'

export type SorableListProps<T> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> & {
  rowKey?: keyof T | 'id'
  value: T[]
  onChange?: (value: T[], newIds: string[]) => void
  renderItem?: (item: T, index: number) => React.ReactNode
}

/**
 * SortableList component
 *  @param rowKey - The key of the row object to use as the identifier. Defaults to 'id'.
 *  @param value - The array of objects to display in the list.
 *  @param onChange - A callback function that is called when the list is sorted.
 *  @param renderItem - A function that returns the React element to render for each item in the list.
 * @param props
 * @returns
 */
export function SortableList<T>(props: SorableListProps<T>) {
  const {
    rowKey = 'id',
    value,
    onChange,
    renderItem,
    className,
    ...reset
  } = props
  const currentIds = value.map((z) => z[rowKey as keyof T]) as string[]
  const currentIdsStr = currentIds.join(',')
  const [parent, ids, setIds] = useDragAndDrop<HTMLDivElement, string>(
    currentIds,
    {
      onSort(data) {
        const newIds = data.values as string[]
        const newValue = value.sort(
          (a, b) =>
            newIds.indexOf(a[rowKey as keyof T] as string) -
            newIds.indexOf(b[rowKey as keyof T] as string),
        )
        onChange?.(newValue, newIds)
      },
      draggable: (el) => {
        return !el.classList.contains('not-drag')
      },
      plugins: [animations()],
    },
  )
  useEffect(() => {
    setIds(currentIdsStr.split(','))
  }, [setIds, currentIdsStr])

  return (
    <div
      ref={parent}
      className={cn('flex flex-wrap gap-2', className)}
      {...reset}
    >
      {ids.map((id, index) => {
        const item = value.find((z) => z[rowKey as keyof T] === id)
        if (!item) return null
        return <Fragment key={id}>{renderItem?.(item, index)}</Fragment>
      })}
      {props.children}
    </div>
  )
}
