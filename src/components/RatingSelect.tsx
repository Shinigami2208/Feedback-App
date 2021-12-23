import React from 'react'

interface Props {
  rating: number
  select: (selected: number) => void
}

const RatingSelect = ({ rating, select }: Props) => {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    select(+e.currentTarget.value)
  }
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <div>
      <ul className="rating">
        {array.map((element: number) => (
          <li key={element}>
            <input
              type="radio"
              id={`num${element}`}
              name="rating"
              value={element}
              onChange={handleChange}
              checked={rating === element}
            />
            <label htmlFor={`num${element}`}>{element}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RatingSelect
