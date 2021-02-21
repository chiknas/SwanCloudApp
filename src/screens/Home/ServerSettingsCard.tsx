import {Card} from 'components/Card';
import {Title} from 'components/Title';
import React, {useState} from 'react';
import {ServerSettingsModal} from './ServerSettingsModal';

export type ServerSettingsCardProps = {
  onUpdate: () => void;
  server?: string;
  serverKey?: string;
};

export const ServerSettingsCard: React.FunctionComponent<ServerSettingsCardProps> = ({
  onUpdate,
  server,
  serverKey,
}) => {
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  return (
    <>
      <Card
        onPress={async () => {
          setShowSettingsModal(true);
        }}>
        <Title>{server ?? 'Setup server url'}</Title>
        {serverKey === undefined && <Title>{'Setup api key'}</Title>}
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
