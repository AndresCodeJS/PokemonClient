import React,{useEffect} from 'react';
import { connect } from "react-redux";
import {AnimatePresence, motion} from 'framer-motion';
import {Modal} from 'reactstrap'

import styles from './popup.module.css'

export default function Popup(props){

    window.scrollTo(0,props.position)

    return (
                 <div className={styles.modalWindow}>
                            <div>
                                <div>
                                {props.title}
                                </div>
                                <div onClick={()=>{props.close()}} className={styles.buttonModal}>
                                    Got it!
                                </div>
                            </div>
                            <div className={styles.imageModal}>
                                <img src={props.image} height='120' weight='120'></img>
                            </div>
                        </div>
    )
}
