import {Card} from 'components/Card';
import {Title} from 'components/Title';
import React, {useState} from 'react';
import {ServerSettingsModal} from './ServerSettingsModal';

export type ServerSettingsCardProps = {
  onUpdate: () => void;
  server?: string;
};

// Removes protocols and paths from the url
// ex. http://example.com/api = example.com
const extractUrlDomain = (url?: string) => {
  return url ? url.replace(/(^\w+:|^)\/\//, '').split('/')[0] : '';
};

export const ServerSettingsCard: React.FunctionComponent<ServerSettingsCardProps> = ({
  onUpdate,
  server,
}) => {
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  return (
    <>
      <Card
        onPress={async () => {
          setShowSettingsModal(true);
        }}>
        <Title>
          {extractUrlDomain(server) ?? 'Click to setup server details'}
        </Title>
      </Card>
      {showSettingsModal && (
        <ServerSettingsModal
          onClose={() => {
            setShowSettingsModal(false);
            onUpdate();
          }}
        />
      )}
    </>
  );
};
