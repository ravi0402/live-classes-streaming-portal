import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.scss';
import { hot } from 'react-hot-loader/root';
const imagesPath = require.context('../../assets/images/', true, /.svg$/);

const ErrorCase = ({ errorInfo = {}, showAnimation }) => {

    const { icon, color, description } = errorInfo;
    const errorImg = imagesPath(`./${icon}.svg`);

    return (
        <div className={cx(styles.container, { [styles.transition]: showAnimation })} style={{ backgroundColor: color }}>
            <img className={styles.icon} src={errorImg} />
            <div className={styles.text}>{description}</div>
        </div>
    )
}

ErrorCase.propTypes = {
    errorInfo: PropTypes.object,
    showAnimation: PropTypes.bool,
}

export default hot(ErrorCase)