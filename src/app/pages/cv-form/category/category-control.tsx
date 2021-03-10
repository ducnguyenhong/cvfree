import { CategoryControlProps } from '../cv-form.types'

export const CategoryControl: React.FC<CategoryControlProps> = (props) => {
  const { name, onUpCategory, onDownCategory, onRemoveCategory, categoryRef } = props
  return (
    <div className="category-control border border-gray-400 rounded-sm h-6 absolute -top-3 right-0 flex items-center opacity-0 group-hover:opacity-100  duration-300">
      <div
        onClick={() => onUpCategory(name)}
        className="px-3 h-full cursor-pointer bg-gray-600 border border-gray-400 border-t-0 border-l-0 border-b-0 flex justify-center items-center hover:bg-gray-700 duration-300"
      >
        <i className="fas fa-caret-up text-white text-lg"></i>
      </div>
      <div
        className="px-3 h-full bg-gray-600 border border-gray-400 border-t-0 border-l-0 border-b-0 cursor-pointer flex justify-center items-center hover:bg-gray-700 duration-300"
        onClick={() => onDownCategory(name)}
      >
        <i className="fas fa-caret-down text-white text-lg"></i>
      </div>
      <div
        onClick={() => categoryRef.current?.onCreate()}
        className="flex justify-center items-center px-3 h-full cursor-pointer bg-gray-600 border border-gray-400 border-t-0 border-l-0 border-b-0 hover:bg-green-500 duration-300"
      >
        <i className="text-white fas fa-plus"></i>
      </div>
      <div
        onClick={() => onRemoveCategory(name)}
        className="flex justify-center items-center px-3 h-full cursor-pointer bg-gray-600 hover:bg-red-600 duration-300"
      >
        <i className="text-white fas fa-times"></i>
      </div>
    </div>
  )
}
