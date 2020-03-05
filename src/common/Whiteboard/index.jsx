import { hot } from "react-hot-loader/root";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import _ from 'lodash';
import cls from "./index.css";

// WHITEcGFydG5lcl9pZD1GbXBMQmhlUDRTempKRllJMzUybGczNHhqcVJPNlVhR0YwV1Qmc2lnPWQ0MTFhMTY5Y2E0NmQ4MDFmMzdjZjY0MjlmYjRjYjJhZWY3NzZmYmQ6YWRtaW5JZD04OTUmcm9sZT1taW5pJmV4cGlyZV90aW1lPTE2MTQzNTgwODImYWs9Rm1wTEJoZVA0U3pqSkZZSTM1MmxnMzR4anFSTzZVYUdGMFdUJmNyZWF0ZV90aW1lPTE1ODI4MDExMzAmbm9uY2U9MTU4MjgwMTEyOTU1ODAw

export function Whiteboard() {
    // const canvas = useRef(null);
    let canvas, colors, context, current, drawing, socket, mediaStream;

    // useEffect(() => {

    // })

    useLayoutEffect(() => {
        canvas = document.getElementById('whiteboard');
        colors = document.getElementsByClassName('color');
        console.log(Object.keys(canvas));
        context = canvas.getContext('2d');
        current = {
            color: 'black'
        };
        drawing = false;
        socket = io();

        console.log(canvas, context);
        canvas.addEventListener('mousedown', onMouseDown, false);
        canvas.addEventListener('mouseup', onMouseUp, false);
        canvas.addEventListener('mouseout', onMouseUp, false);
        canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

        //Touch support for mobile devices
        // canvas.addEventListener('touchstart', onMouseDown, false);
        // canvas.addEventListener('touchend', onMouseUp, false);
        // canvas.addEventListener('touchcancel', onMouseUp, false);
        // canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

        for (let i = 0; i < colors.length; i++) {
            colors[i].addEventListener('click', onColorUpdate, false);
        }

        socket.on('drawing', onDrawingEvent);

        window.addEventListener('resize', onResize, false);
        onResize();

        mediaStream = canvas.captureStream(20);
    })

    console.log(mediaStream);

    const drawLine = (x0, y0, x1, y1, color, emit) => {
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.stroke();
        context.closePath();

        if (!emit) { return; }
        let w = canvas.width;
        let h = canvas.height;

        socket.emit('drawing', {
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color: color
        });
    }

    const onMouseDown = (e) => {
        drawing = true;
        current.x = e.clientX || e.touches[0].clientX;
        current.y = e.clientY || e.touches[0].clientY;
    }

    const onMouseUp = (e) => {
        if (!drawing) { return; }
        drawing = false;
        drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
    }

    function onMouseMove(e) {
        if (!drawing) { return; }

        console.log(e);
        drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY, current.color, true);
        current.x = e.clientX || e.touches[0].clientX;
        current.y = e.clientY || e.touches[0].clientY;
    }

    const onColorUpdate = (e) => {
        current.color = e.target.className.split(' ')[1];
    }

    // limit the number of events per second
    const throttle = (callback, delay) => {
        let previousCall = new Date().getTime();
        return () => {
            let time = new Date().getTime();

            if ((time - previousCall) >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    }

    const onDrawingEvent = (data) => {
        let w = canvas.width;
        let h = canvas.height;
        drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }

    // make the canvas fill its parent
    const onResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    return (
        <React.Fragment>
            <canvas id='whiteboard' style={{ width: 400, height: 400, borderColor: '#ececec', borderWidth: 1, borderStyle: 'solid' }} className="whiteboard"></canvas>
            <div className="colors">
                <div className="color black"></div>
                <div className="color red"></div>
                <div className="color green"></div>
                <div className="color blue"></div>
                <div className="color yellow"></div>
            </div>
        </React.Fragment>
    )
}

export default hot(Whiteboard);