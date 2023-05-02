import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumb = (props) => (
  <section className="breadcrumb-outer">
    <h1>{props.page}</h1>
    {(props.pageList && props.pageList.length > 0) && (
      <ol className="breadcrumb">
        {props.pageList.map((page, index) =>
          page.link ?
            <li key={index} className="position-relative">
              <Link to={page.link} className="link-text">{page.name}</Link>
            </li>
          :
            <li key={index} className={`position-relative link-text ${index === 0 && `head-link-text`}`}>{page.name}</li>
        )}
     </ol>
   )}
  </section>
)

export default BreadCrumb