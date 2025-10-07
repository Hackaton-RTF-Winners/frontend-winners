import { css } from '@emotion/css'

export const parentContainer = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`

export const parentFiltersContainer = css`
  grid-column: span 2;
  height: 80px;
  background: grey;
`
export const filterContainer = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`

export const filterItemContainer = css`
  width: 50px;
  height: 30px;
  border: 1px solid black;
  border-radius: 10px;
`
