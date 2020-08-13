import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import ImageLinkFormURL from './ImageLinkFormURL'
import ImageLinkFormFile from './ImageLinkFormFile'
import '../../App.css'
import './ImageLinkForm.css'
import './ReactTabs.css'

const ImageLinkForm = ({ value, handleInputChangeUrl, onButtonSubmitUrl, handleInputChangeFile, onButtonSubmitFile}) => {
  return (
    <div>
      <p className='f3' style={{paddingTop: '14px', paddingBottom: '14px'}}>
        {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p>

      <div className='center'>
        <div className='center form pa3 br3 shadow-5' style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>

          <Tabs defaultIndex={0} style={{ width: '100%' }}>
            <TabList style={{ textAlign: 'left' }}>
              <Tab>Upload File</Tab>
              <Tab>Upload URL</Tab>
            </TabList>

            <TabPanel>
              <div style={{ width: '100%', display: 'flex', marginTop: '10px' }}>
                <ImageLinkFormFile
                  handleInputChange={handleInputChangeFile}
                  onButtonSubmit={onButtonSubmitFile}
                />
              </div>
            </TabPanel>

            <TabPanel>
              <div style={{ width: '100%', display: 'flex', marginTop: '10px' }}>
                <ImageLinkFormURL
                  value={value}
                  handleInputChange={handleInputChangeUrl}
                  onButtonSubmit={onButtonSubmitUrl}
                />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
      <p className="f6">
        Icons made by&nbsp;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.flaticon.com/authors/freepik"
          title="Freepik"
        >
          Freepik
        </a>
        &nbsp;from&nbsp;
        <a
          href="https://www.flaticon.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="Flaticon"
        >
          www.flaticon.com
        </a>
      </p>
    </div>
  )
}

export default ImageLinkForm;
