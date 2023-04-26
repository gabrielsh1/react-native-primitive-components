import { StyleSheet } from 'react-native';

export const styles = () => StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 16,

    alignItems: 'center',

    backgroundColor: '#FFF',
  },

  item: {
    paddingVertical: 8,
  },

  floating: {
    width: 48,
    height: 48,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 24,
    backgroundColor: '#1A1A1C',
  },

  button: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 4,
    backgroundColor: '#1A1A1C',
  },
  
  label: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '500',

    color: '#FFF',
  },

  // --MODALIZE-- //
  modal__header: {
    paddingVertical: 15,
    marginHorizontal: 15,

    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },

  modal__headerText: {
    fontSize: 15,
    fontWeight: '200',
  },

  content: {
    paddingHorizontal: 15,
  },

  content__row: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 15,

    borderBottomColor: '#f9f9f9',
    borderBottomWidth: 1,
  },

  content__avatar: {
    width: 38,
    height: 38,

    marginRight: 15,

    overflow: 'hidden',

    backgroundColor: '#eee',
    borderRadius: 19,
  },

  content__name: {
    fontSize: 16,
  },

  content__button: {
    alignItems: 'center',
    justifyContent: 'center',

    marginVertical: 20,
  },
});