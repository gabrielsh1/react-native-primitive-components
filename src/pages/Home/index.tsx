import { useRef, useState } from 'react';
import Animated from 'react-native-reanimated';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { Modalize } from '../../components/Modalize';

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
    </View>
  );
};

export function Home() {
  const flatListRef = useRef<FlatList>(null);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  function handleToggleModal() {
    setIsModalVisible(prev => !prev);
  };

  function handleScrollToTop() {
    if (flatListRef.current) {
      flatListRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    };
  };

  return (
    <View style={styles().container}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles().button}
        onPress={handleToggleModal}
      >
        <Text style={styles().label}>Open modal</Text>
      </TouchableOpacity>

      <Modalize
        title="Modalize"
        withHeader={true}
        withCloseButton={true}
        visible={isModalVisible}
        flatListRef={flatListRef}
        ajustToFullViewport={true}
        onToggleModal={handleToggleModal}
        contentStyle={{ paddingHorizontal: 16 }}
        flatListStyle={{ paddingHorizontal: 16 }}
        flatListProps={{
          data: list,
          initialNumToRender: 20,
          scrollEventThrottle: 16,
          keyExtractor: (item, index) => `item=${index}`,
          onScroll: Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: true,
          }),
          renderItem: () => (
            <View style={styles().content__row}>
              <View style={styles().content__avatar} />

              <Text style={styles().content__name}>Name Surname</Text>
            </View>
          ),
        }}
        FooterComponent={(
          <View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => { }}
              style={styles().button}
            >
              <Text style={styles().label}>Label</Text>
            </TouchableOpacity>
          </View>
        )}
        FloatingComponent={(
          <Animated.View
            style={{
              opacity: scrollY.interpolate({
                inputRange: [100, 200],
                outputRange: [0, 1],
              }),
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleScrollToTop}
              style={styles().floating}
            >
              <Text style={styles().label}>Top</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      >
        <ModalizeContent />
      </Modalize>
    </View>
  );
};