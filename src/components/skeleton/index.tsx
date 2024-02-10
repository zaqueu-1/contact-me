import React from 'react'
import Skeleton from 'react-loading-skeleton'
import styles from './contactSkeleton.module.css'

export default function ContactSkeleton({ count }: { count: number}) {  
  return (
    <>
      {Array.from({ length: count }).map((i, index) => (
        <div key={index} className={styles.contact}>
          <span><Skeleton height={20} /></span>
          <span><Skeleton height={20} /></span>
          <span><Skeleton height={20} /></span>
          <span></span>
          <div className={styles.controls}>
              <button></button>
              <button></button>
          </div>
        </div>
      ))}
    </>
  )
}
