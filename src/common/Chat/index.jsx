import React from 'react';
import { hot } from 'react-hot-loader/root';
import _map from 'lodash/map';
import cx from 'classnames';
import { ChevronRightIcon } from '@toppr/toppr-icons';
import styles from './index.scss';
import { useState } from 'react';

export function Chat() {
    const [showDropdown, setDropdown] = useState(false);
    const [currentTab, setCurrentTab] = useState({
        label: 'Chatroom',
        value: 'chatroom'
    });

    const dropdownOptions = [
        {
            label: 'Chatroom',
            value: 'chatroom'
        },
        {
            label: 'About this course',
            value: 'about'
        }
    ];

    const handleOptionClick = (e, option) => {
        setCurrentTab(option);
        e.stopPropagation();
    }

    const handleDropdownClick = (e) => {
        setDropdown(!showDropdown);
        e.stopPropagation();
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.currentSelection} onClick={handleDropdownClick}>
                    {currentTab.label}
                    <ChevronRightIcon className={cx(styles.chevronIcon, { [styles.expand]: showDropdown })} />
                    {
                        showDropdown ?
                            <div className={styles.dropdown}>
                                {
                                    _map(dropdownOptions, option => {
                                        if (option.value === currentTab.value) return null
                                        return (
                                            <div
                                                className={cx(styles.option, { [styles.selected]: option.value === currentTab.value })}
                                                onClick={(e) => { handleOptionClick(e, option) }}>
                                                {option.label}
                                            </div>
                                        )
                                    })
                                }
                            </div> : null
                    }
                </div>

            </div>
        </div >
    )
}

export default hot(Chat);