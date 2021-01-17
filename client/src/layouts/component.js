import React, { useState, useEffect } from 'react';

export default class Component extends React.Component{
    constructor(){
        super(props);

        this.imagePickerRef = React.createRef();
    }

    render() {
        <>
            <CreateImagePicker 
                ref={this.imagePickerRef}
                className="createIdeaImagePickerImage"
            />     
            
            <Component2 
                imgPickerRef={this.imagePickerRef}
                />
        </>
    }
}