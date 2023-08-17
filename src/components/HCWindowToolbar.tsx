import React from 'react';
import { MosaicWindowContext, MosaicButtonProps, MosaicContext } from 'react-mosaic-component';
import { CloseOutlined } from '@ant-design/icons';

export const HCWindowToolbar: React.FC = () => {
  return (
    <MosaicContext.Consumer>
      {({ mosaicActions }) => (
        <MosaicWindowContext.Consumer>
          {({mosaicWindowActions }) => {
            return (
              <CloseOutlined
                onClick={() => mosaicActions.remove(mosaicWindowActions.getPath())}
                style={{ cursor: 'pointer', margin: '0 5px' }}
              />
            )
          }}
        </MosaicWindowContext.Consumer>
      )}
    </MosaicContext.Consumer>
  );
};
