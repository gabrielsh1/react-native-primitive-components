import { useRef } from 'react';
import { Portal } from 'react-native-portalize';
import { View, Text, TouchableOpacity } from 'react-native';
import { Modalize as ModalizeComponent } from 'react-native-modalize';

import { styles } from './styles';

const list = [
  { id: '0' },
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' },
  { id: '7' },
  { id: '8' },
  { id: '9' },
  { id: '10' },
  { id: '11' },
  { id: '12' },
  { id: '13' },
  { id: '14' },
  { id: '15' },
  { id: '16' },
  { id: '17' },
  { id: '18' },
  { id: '19' },
];

function ModalizeHeader() {
  return (
    <View style={styles().modal__header}>
      <Text style={styles().modal__headerText}>50 users online</Text>
    </View>
  );
};

function ModalizeContent() {
  return (
    <View style={styles().content}>
      {Array(50)
        .fill(0)
        .map((_, i) => (
          <View style={styles().content__row} key={i}>
            <View style={styles().content__avatar} />

            <Text style={styles().content__name}>Name Surname</Text>
          </View>
        ))}

      <View style={styles().content__button}>

      </View>
    </View>
  );
};

export function Modalize() {
  const contentRef = useRef(null);
  const modalizeRef = useRef<ModalizeComponent>(null);

  const handleOpenModal = () => {
    modalizeRef.current?.open();
  };

  return (
    <View style={styles().container}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles().button}
        onPress={handleOpenModal}
      >
        <Text style={styles().label}>Open modal</Text>
      </TouchableOpacity>

      <Portal>
        <ModalizeComponent
          ref={modalizeRef}
          handlePosition="inside"
          contentRef={contentRef}
          // adjustToContentHeight={true}
          modalHeight={500}
          HeaderComponent={<ModalizeHeader />}
          overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}
        >
          <ModalizeContent />
        </ModalizeComponent>
      </Portal>
    </View>
  );
};