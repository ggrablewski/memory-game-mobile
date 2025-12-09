# Deployment do Google Play Store - Instrukcja krok po kroku

## Wymagania wstępne

1. **Konto Google Play Console** ($25 jednorazowa opłata)
   - Zarejestruj się na: https://play.google.com/console/signup

2. **Konto Expo** (darmowe)
   - Zarejestruj się na: https://expo.dev/signup

## Krok 1: Instalacja narzędzi

```bash
# Zainstaluj Expo CLI globalnie (jeśli jeszcze nie masz)
npm install -g eas-cli

# Zaloguj się do Expo
eas login
```

## Krok 2: Konfiguracja projektu

```bash
cd d:\---Dokumenty---\IT\memory-game-mobile

# Inicjalizuj EAS Build
eas build:configure
```

To stworzy plik `eas.json` z konfiguracją buildów.

## Krok 3: Przygotowanie ikony i splash screen

### Ikona aplikacji (icon.png)
- Rozmiar: **1024x1024 px**
- Format: PNG z przezroczystym tłem
- Umieść w: `./assets/icon.png`

### Adaptive Icon (Android)
- Rozmiar: **1024x1024 px**
- Format: PNG
- Umieść w: `./assets/adaptive-icon.png`
- **Ważne**: Środkowa część (512x512) powinna zawierać główny element ikony

### Splash Screen
- Rozmiar: **1242x2436 px** (będzie przeskalowane)
- Format: PNG
- Umieść w: `./assets/splash-icon.png`

## Krok 4: Build APK/AAB dla Google Play

### Opcja A: Build produkcyjny (AAB - Android App Bundle)

```bash
eas build --platform android --profile production
```

To zbuduje `.aab` plik potrzebny do Google Play Store.

### Opcja B: Build testowy (APK - do instalacji na telefonie)

```bash
eas build --platform android --profile preview
```

To zbuduje `.apk` plik który możesz zainstalować bezpośrednio na telefonie.

**Uwaga**: Build może potrwać 10-30 minut. Expo zbuduje aplikację w chmurze.

## Krok 5: Pobierz zbudowaną aplikację

Po zakończeniu builda, EAS CLI pokaże link do pobrania:
- Dla produkcji: `.aab` plik
- Dla testu: `.apk` plik

Lub pobierz z panelu: https://expo.dev/accounts/[twoja-nazwa]/projects/memory-game-mobile/builds

## Krok 6: Przygotowanie do Google Play Console

### 6.1. Stwórz grafikę promocyjną

**Feature Graphic** (wymagane):
- Rozmiar: **1024x500 px**
- Format: PNG lub JPEG
- Pokaż gameplay lub logo gry

**Screenshot'y** (minimum 2, maksimum 8):
- Rozmiar: Minimum **320px** szerokość/wysokość
- Format: PNG lub JPEG
- Zrób screenshoty z gry na telefonie

**Ikona aplikacji w sklepie**:
- Rozmiar: **512x512 px**
- Format: PNG (32-bit)

### 6.2. Przygotuj opisy

**Krótki opis** (max 80 znaków):
```
Klasyczna gra memory - odnajdź wszystkie pary kart!
```

**Pełny opis** (max 4000 znaków):
```
🎮 Gra Memory - Klasyczna zabawa dla całej rodziny!

Odkryj wszystkie pary kart w tej klasycznej grze memory!

🌟 Funkcje:
• Tryb dla 2 graczy
• Gra z komputerem (różne poziomy trudności)
• 4 rozmiary planszy (4×3, 6×5, 9×6, 10×8)
• Kolorowe grafiki
• Przyjazny interfejs
• Bez reklam!

🎯 Idealnie dla:
• Dzieci i dorosłych
• Treningu pamięci
• Zabawy w rodzinie
• Nauki koncentracji

Pobierz teraz i zacznij grać!
```

**Kategoria**: Games > Puzzle

## Krok 7: Upload do Google Play Console

1. Wejdź na: https://play.google.com/console
2. Kliknij **Create app**
3. Wypełnij podstawowe informacje:
   - **App name**: Memory Game
   - **Default language**: Polski
   - **App or game**: Game
   - **Free or paid**: Free

4. Przejdź przez wszystkie wymagane sekcje:

### Store listing (Strona w sklepie)
- Upload grafiki (feature graphic, screenshoty, ikona)
- Dodaj opisy
- Wybierz kategorię
- Dodaj adres email kontaktowy

### Content rating (Klasyfikacja wiekowa)
- Wypełnij kwestionariusz
- Dla gry memory prawdopodobnie: **PEGI 3** (wszyscy)

### App content (Zawartość aplikacji)
- **Privacy policy**: Opcjonalne dla darmowych gier bez zbierania danych
- **Ads**: Nie (jeśli nie masz reklam)
- **In-app purchases**: Nie

### Production (Produkcja)
- Kliknij **Create new release**
- Upload pliku `.aab` który pobrałeś z EAS
- Dodaj **Release notes**:
```
Wersja 1.0.0
- Pierwsza wersja gry
- Tryb 2 graczy
- Gra z komputerem
- 4 rozmiary planszy
```

### Pricing & distribution (Ceny i dystrybucja)
- Wybierz kraje (np. wszystkie lub tylko Polska)
- Potwierdź zgodność z wytycznymi

5. Kliknij **Submit for review** (Wyślij do przeglądu)

## Krok 8: Oczekiwanie na publikację

- **Pierwszy przegląd**: 2-7 dni
- **Kolejne aktualizacje**: Zazwyczaj kilka godzin

Google powiadomi Cię emailem gdy aplikacja zostanie:
- Zatwierdzona ✅
- Odrzucona ❌ (z informacją co poprawić)

## Krok 9: Aktualizacje aplikacji

Gdy chcesz wydać nową wersję:

1. Zaktualizuj `version` i `versionCode` w `app.json`:
```json
{
  "expo": {
    "version": "1.0.1",
    "android": {
      "versionCode": 2
    }
  }
}
```

2. Zbuduj nową wersję:
```bash
eas build --platform android --profile production
```

3. Upload do Google Play Console jako nową wersję

## Przydatne komendy

```bash
# Build dla produkcji (AAB)
eas build --platform android --profile production

# Build testowy (APK)
eas build --platform android --profile preview

# Status buildów
eas build:list

# Konfiguracja
eas build:configure
```

## Rozwiązywanie problemów

### Problem: Build się nie udaje
- Sprawdź logi w konsoli EAS
- Upewnij się, że wszystkie zależności są zainstalowane
- Sprawdź czy `app.json` jest poprawny

### Problem: Google odrzuca aplikację
- Najczęstsze przyczyny:
  - Brak privacy policy (jeśli zbierasz dane)
  - Nieprawidłowa ikona lub grafika
  - Naruszenie praw autorskich
- Przeczytaj dokładnie wiadomość od Google i popraw wskazane problemy

### Problem: Aplikacja crashuje po instalacji
- Testuj na prawdziwym urządzeniu przed publikacją
- Sprawdź logi: `adb logcat` (Android Debug Bridge)

## Koszty

- **Google Play Console**: $25 (jednorazowo, lifetime)
- **Expo EAS Build**:
  - Darmowy plan: 30 buildów/miesiąc
  - Płatny plan: od $29/miesiąc (nieograniczone buildy)

## Linki

- Google Play Console: https://play.google.com/console
- Expo: https://expo.dev
- Dokumentacja EAS: https://docs.expo.dev/build/introduction/
- Wytyczne Google Play: https://play.google.com/about/developer-content-policy/

---

Powodzenia! 🚀
