# Przewodnik konfiguracji testów w VS Code

## ✅ Co zostało skonfigurowane

### 1. Struktura testów
- ✅ 72 testy w 4 plikach (`.test.js` konwencja)
- ✅ **Header.test.js** - 16 testów **DZIAŁA PERFEKCYJNIE** ✅
- ⚠️ **Card.test.js** - 14 testów (wymaga naprawy mocków)
- ⚠️ **WelcomeScreen.test.js** - 20 testów (wymaga naprawy mocków)
- ⚠️ **GameBoard.test.js** - 22 testy (wymaga naprawy mocków)

### 2. Konfiguracja VS Code

#### Zainstalowane pliki:
- **[.vscode/settings.json](.vscode/settings.json)** - Ustawienia Jest i Coverage Gutters
- **[.vscode/extensions.json](.vscode/extensions.json)** - Rekomendowane rozszerzenia
- **[.vscode/launch.json](.vscode/launch.json)** - Konfiguracja debugowania

#### Wymagane rozszerzenia VS Code:
1. **Jest** (`orta.vscode-jest`) - Uruchamianie testów z UI
2. **Coverage Gutters** (`ryanluker.vscode-coverage-gutters`) - Wizualizacja coverage

## 📋 Odpowiedzi na pytania

### 1. Dlaczego `.test.js` zamiast `.spec.js`?

- **`.test.js`** - standard w React/React Native (Facebook/Meta convention)
- **`.spec.js`** - częściej w Angular i BDD

Jeśli wolisz `.spec.js`, wystarczy zmienić nazwy plików:
```bash
cd components
rename 's/\.test\.js$/.spec.js/' *.test.js
```

### 2. Jak uruchamiać testy z UI w VS Code?

#### Po zainstalowaniu rozszerzenia `orta.vscode-jest`:

1. **Automatyczne wykrywanie**:
   - Rozszerzenie automatycznie wykryje testy
   - Ikona kolby pojawi się w lewym panelu
   - Zielone/czerwone kropki przy testach w edytorze

2. **Uruchamianie pojedynczych testów**:
   - Kliknij zieloną strzałkę obok nazwy testu
   - Lub użyj CodeLens "Run" nad testem
   - Lub kliknij prawym na test → "Jest: Run Related Tests"

3. **Uruchamianie pliku testowego**:
   - Otwórz plik `.test.js`
   - Kliknij "Run" w CodeLens nad `describe`
   - Lub `Ctrl+Shift+P` → "Jest: Run File"

4. **Debug testów**:
   - Kliknij "Debug" w CodeLens
   - Lub `F5` z otwartym plikiem testowym
   - Breakpointy będą działać!

#### Komendy z palety (Ctrl+Shift+P):
- `Jest: Start Runner` - Uruchom automatyczne testowanie
- `Jest: Stop Runner` - Zatrzymaj
- `Jest: Run All Tests` - Uruchom wszystkie
- `Jest: Run File` - Uruchom bieżący plik
- `Jest: Toggle Coverage` - Włącz/wyłącz coverage overlay

### 3. Jak zobaczyć coverage graficznie?

#### Krok 1: Uruchom testy z coverage
```bash
npm run test:coverage
```

To wygeneruje katalog `coverage/` z raportami.

#### Krok 2: Włącz Coverage Gutters w VS Code

1. Otwórz plik komponentu (np. [components/Header.js](components/Header.js))
2. Naciśnij `Ctrl+Shift+P`
3. Wpisz: `Coverage Gutters: Display Coverage`
4. Lub kliknij "Watch" w dolnej belce

#### Co zobaczysz:

- 🟢 **Zielone tło** - linie pokryte testami
- 🔴 **Czerwone tło** - linie NIE pokryte
- 🟡 **Żółte tło** - częściowo pokryte (np. tylko jeden branch if/else)
- Liczby w gutterze - ile razy linia została wykonana

#### Skróty klawiszowe:
- `Ctrl+Shift+7` - Toggle coverage display
- `Ctrl+Shift+8` - Remove coverage
- `Ctrl+Shift+9` - Watch coverage (auto-refresh)

#### Raporty HTML:
Otwórz w przeglądarce: `coverage/lcov-report/index.html`

### 4. Jak naprawić niedzialające testy?

#### Problem: React Native ES6 modules
Komponenty Card, WelcomeScreen i GameBoard używają komponentów RN które mają problemy z mockowaniem.

#### Rozwiązanie 1: Użyj shallow rendering (zalecane)
Zamiast pełnego renderowania, testuj tylko logikę komponentu:

```javascript
// Zamiast:
import { render } from '@testing-library/react-native';

// Użyj:
import { shallow } from 'enzyme';
// lub
import TestRenderer from 'react-test-renderer/shallow';
```

#### Rozwiązanie 2: Ulepszone mocki
Dodaj do [jest.setup.js](jest.setup.js:38-end):

```javascript
// Lepszy mock dla ScrollView
jest.mock('react-native/Libraries/Components/ScrollView/ScrollView', () => {
  const RN = jest.requireActual('react-native');
  const React = require('react');

  return class MockScrollView extends React.Component {
    render() {
      return React.createElement(
        'RCTScrollView',
        this.props,
        this.props.children
      );
    }
  };
});
```

#### Rozwiązanie 3: Testuj tylko Header (działa!)
Skoncentruj się na komponentach które działają:

```bash
npm test -- Header
```

## 🎯 Status aktualny

### ✅ DZIAŁA:
- [components/Header.test.js](components/Header.test.js) - **16/16 testów** ✅
- Konfiguracja VS Code dla testów
- Konfiguracja coverage visualization
- Debugowanie testów

### ⚠️ WYMAGA NAPRAWY:
- **Card.test.js** - Problem z mockowaniem StyleSheet
- **WelcomeScreen.test.js** - Problem z ScrollView ES6 exports
- **GameBoard.test.js** - Problem z Modal i Dimensions ES6 exports

## 📝 Szybki start

### Testowanie z terminala:
```bash
# Wszystkie testy
npm test

# Z coverage
npm run test:coverage

# Watch mode
npm run test:watch

# Tylko Header (działa!)
npm test -- Header

# Konkretny plik
npm test -- WelcomeScreen
```

### Testowanie z VS Code:
1. Zainstaluj rozszerzenia (VS Code zapyta automatycznie)
2. Poczekaj aż Jest się zainicjalizuje (patrz dolna belka)
3. Otwórz [components/Header.test.js](components/Header.test.js)
4. Kliknij zielone strzałki obok testów!

### Coverage w VS Code:
1. Uruchom: `npm run test:coverage`
2. Otwórz [components/Header.js](components/Header.js)
3. Naciśnij `Ctrl+Shift+P` → "Coverage Gutters: Display Coverage"
4. Zobacz kolorowe tło pokazujące pokrycie!

## 🔧 Troubleshooting

### Jest nie startuje w VS Code
1. Sprawdź output: "View" → "Output" → wybierz "Jest"
2. Sprawdź czy `node_modules/.bin/jest` istnieje
3. Restart VS Code
4. Wyczyść cache: `npm test -- --clearCache`

### Coverage nie pokazuje się
1. Upewnij się że uruchomiłeś `npm run test:coverage`
2. Sprawdź czy istnieje `coverage/lcov.info`
3. Sprawdź ustawienie: "Coverage-gutters: Coverage File Names"
4. Kliknij "Watch" w dolnej belce

### Testy są wolne
1. Uruchom tylko część: `npm test -- Header`
2. Użyj `--maxWorkers=4` dla mniejszej liczby workerów
3. Wyłącz auto-run w settings.json: `"jest.autoRun": "off"`

## 📚 Dodatkowe zasoby

- [Jest Documentation](https://jestjs.io/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [VS Code Jest Extension](https://github.com/jest-community/vscode-jest)
- [Coverage Gutters](https://marketplace.visualstudio.com/items?itemName=ryanluker.vscode-coverage-gutters)
