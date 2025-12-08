# Workflow: Implementing Designs from Zeplin with MCP

This document describes the process used to implement UI components from Zeplin using the Model Context Protocol (MCP) with GitHub Copilot.

## Project Architecture

### Frontend Structure

The project follows a Next.js 14+ structure with App Router and a centralized design system:

```
frontend/
├── app/
│   ├── components/          # Reusable React components
│   │   ├── Header.tsx
│   │   ├── SearchForm.tsx
│   │   ├── ResultsList.tsx
│   │   └── RadioButton.tsx
│   ├── search/             # Route: /search
│   │   └── page.tsx
│   ├── layout.tsx          # Root layout (includes Header)
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── styles/                 # Vanilla Extract CSS modules
│   ├── design-system.css.ts   # ⭐ Centralized design tokens
│   ├── header.css.ts
│   ├── searchForm.css.ts
│   ├── search.css.ts
│   └── radioButton.css.ts
├── context/                # React Context for state management
│   └── SearchContext.tsx
└── types/                  # TypeScript type definitions
    └── index.ts
```

### Design System Architecture

**File:** `frontend/styles/design-system.css.ts`

All colors, fonts, and common design tokens are centralized here:

```typescript
export const vars = {
  font: {
    montserrat: 'Montserrat, Arial, sans-serif',
  },
  color: {
    // Background colors
    background: '#f3f4f6',
    panel: '#ffffff',
    lightGrey: '#ededed',
    
    // Text colors
    text: '#111827',
    muted: '#6b7280',
    black: '#000',
    darkGrey: '#383838',
    darkGrey56: 'rgb(56, 56, 56)',
    
    // Brand colors
    accent: '#10b981',
    greenTeal: 'rgb(10, 180, 99)',
    emerald: 'rgb(0, 148, 255)',
    
    // UI colors
    pinkishGrey: 'rgb(196, 196, 196)',
    greyBorder: 'rgb(218, 218, 218)',
    warmGrey75: 'rgba(132, 132, 132, 0.75)',
    white: '#fff',
  },
};
```

**Why this architecture?**
- ✅ Single source of truth for design tokens
- ✅ Easy to update colors project-wide
- ✅ Type-safe with TypeScript
- ✅ Consistent with Zeplin design tokens
- ✅ Vanilla Extract provides zero-runtime CSS-in-JS

## Initial Setup

### 1. Zeplin MCP
The project uses Zeplin integration through MCP to extract design specifications directly from Zeplin.

**Available MCP tools:**
- `mcp_zeplin_get_screen`: Get complete screen data from Zeplin
- `mcp_zeplin_get_component`: Get specific component data
- `mcp_zeplin_download_layer_asset`: Download assets (images, icons) from Zeplin

### 2. Design System
All colors and styles are centralized in `frontend/styles/design-system.css.ts` using vanilla-extract.

## Implementation Process

### Step 1: Extract Specifications from Zeplin

Use GitHub Copilot with the following prompt:

```
Generate a component from the "[LAYER_NAME]" layer in this screen: [ZEPLIN_URL]
```

**Real example used in this project:**
```
Generate a component from the "SearchContainer" layer in this screen: https://zpl.io/adPNZ5R
```

### Step 2: Review Extracted Data

The MCP returns a JSON with:
- **Dimensions**: width, height, position (rect)
- **Colors**: fills, borders (with RGB values)
- **Shadows**: shadows (boxShadow)
- **Typography**: fontFamily, fontSize, fontWeight, color
- **Design Tokens**: Reusable colors and styles from the project

### Step 3: Create/Update Design Tokens

**Suggested prompt:**
```
Add the colors [COLOR_NAME] and [COLOR_NAME] to the design system according to Zeplin values:
- [color-name]: rgb(X, Y, Z)
- [color-name-2]: rgba(X, Y, Z, A)
```

**Example used:**
```
Add the colors pinkishGrey and greyBorder to the design system according to Zeplin:
- pinkishGrey: rgb(196, 196, 196)
- greyBorder: rgb(218, 218, 218)
```

### Step 4: Create Styles with Vanilla Extract

**File structure:**
- Components: `frontend/app/components/[ComponentName].tsx`
- Styles: `frontend/styles/[componentName].css.ts`

**Prompt to create styles:**
```
Create vanilla-extract styles for [COMPONENT] according to Zeplin specifications:
- Dimensions: [width] x [height]
- Border: [thickness] solid [color]
- Border-radius: [value]px
- Box-shadow: [shadow-spec]
- Use design system variables where possible
```

**Example used:**
```
Update SearchContainer with exact Zeplin specifications: 
- 410px x 230px
- border-radius 4px
- grey border
- shadow according to warm-grey-75
```

### Step 5: Create React Component

**Basic prompt:**
```
Create a React component [ComponentName] using styles from [componentName].css.ts
Props needed: [list props]
```

**Example used:**
```
Create a RadioButton component using the styles, with props:
- checked: boolean
- onChange: function
- name: string
```

## Complete Project Examples

### Example 1: Header Component

**Step 1 - Extract specifications:**
```
Generate a component from the "Header" layer in this screen: https://zpl.io/adPNZ5R
```

**Step 2 - Create styles:**
```typescript
// frontend/styles/header.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './design-system.css';

export const header = style({
  width: '100%',
  height: '50px',
  backgroundColor: vars.color.white,
  boxShadow: '0 2px 0 0 rgb(218, 218, 218)',
  position: 'sticky',
  top: 0,
  zIndex: 100,
});

export const title = style({
  fontFamily: vars.font.montserrat,
  fontSize: '18px',
  fontWeight: 700,
  color: vars.color.greenTeal,
});
```

**Step 3 - Create component:**
```typescript
// frontend/app/components/Header.tsx
import React from 'react';
import * as styles from '../../styles/header.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>SWStarter</h1>
    </header>
  );
}
```

### Example 2: SearchContainer + Input + Button

**Step 1 - Extract multiple layers:**
```
Generate a component from the "SearchContainer" layer in this screen: https://zpl.io/adPNZ5R
Generate a component from the "Rectangle" layer in this screen: https://zpl.io/adPNZ5R (input)
Generate a component from the "SearchButton-Disabled" layer in this screen: https://zpl.io/adPNZ5R
```

**Step 2 - Create consolidated styles:**
```typescript
// frontend/styles/searchForm.css.ts
export const SearchContainer = style({
  width: '410px',
  height: '230px',
  padding: '30px',
  borderRadius: '4px',
  boxShadow: '0 1px 2px 0 rgba(132, 132, 132, 0.75)',
  border: `1px solid ${vars.color.greyBorder}`,
  backgroundColor: vars.color.white,
});

export const input = style({
  width: '100%',
  height: '40px',
  padding: '0 12px',
  border: `1px solid ${vars.color.pinkishGrey}`,
  borderRadius: '4px',
  boxShadow: 'inset 0 1px 3px 0 rgba(132, 132, 132, 0.75)',
});

export const btn = style({
  background: vars.color.greenTeal,
  color: vars.color.white,
  height: '34px',
  borderRadius: '20px',
  fontWeight: 700,
  width: '100%',
});
```

### Example 3: Results Container with Items

**Step 1 - Extract container:**
```
Generate a component from the "MatchesBG" layer in this screen: https://zpl.io/adPNZ5R
```

**Step 2 - Prompt for result items:**
```
Create styles for result items with:
- Separators between items (border-bottom pinkishGrey)
- Title: Montserrat 18px bold
- Button "SEE DETAILS": green-teal, border-radius 20px
```

## Useful Prompts for Different Cases

### Validate multiple components at once:
```
Validate these components and adjust according to Zeplin:
1. Generate a component from the "[LAYER_1]" layer in this screen: [URL]
2. Generate a component from the "[LAYER_2]" layer in this screen: [URL]
```

### Extract entire screen:
```
Generate a component from the "[SCREEN_NAME]" layer in this screen: [URL]
(without specifying targetLayerName to get the entire screen)
```

### Add colors to design system:
```
Review these components and add missing colors to the design system:
[list components with hardcoded colors]
```

### Create component variants:
```
Create a [Name] component with variants according to Zeplin:
- Normal state: [specs]
- Hover state: [specs]
- Disabled state: [specs]
```

## Best Practices

### 1. Implementation Order
1. Header/Global layout
2. Main containers
3. Forms and inputs
4. Lists and repeating items
5. Buttons and interactive elements

### 2. Design Tokens
- Always check if a token exists before using direct values
- Group related colors (e.g., all grey variations)
- Use semantic names (greenTeal, pinkishGrey vs color1, color2)

### 3. Reusable Components
- Extract small components (RadioButton, Button)
- Use props for variants (checked, disabled, size)
- Keep styles in separate .css.ts files

### 4. Validation with Zeplin
Use this prompt to validate:
```
Compare these styles with Zeplin and adjust:
[paste current styles]
Zeplin URL: [URL]
```

## Implementation Checklist

- [ ] Extract specifications from Zeplin with MCP
- [ ] Add colors to design system
- [ ] Create .css.ts styles file
- [ ] Create React .tsx component
- [ ] Validate dimensions and spacing
- [ ] Validate colors and typography
- [ ] Validate shadows and borders
- [ ] Test interactive states (hover, focus, disabled)
- [ ] Verify responsive behavior (if applicable)

## Useful Commands

```bash
# Start development server
npm run dev

# Type check TypeScript
npm run type-check

# Production build
npm run build
```

## Resources

- [Zeplin Project](https://app.zeplin.io/project/5bd8ab5ecca0bd3794a602e7)
- [Vanilla Extract Docs](https://vanilla-extract.style/)
- [MCP Zeplin Integration](https://github.com/modelcontextprotocol/servers)

## Additional Notes

This workflow was developed with the assistance of GitHub Copilot, using the Zeplin MCP to ensure that all components match the design specifications exactly.

**Advantages of this approach:**
- ✅ Exact precision with design
- ✅ Consistent design tokens
- ✅ Fewer implementation errors
- ✅ Automatic documentation of specifications
- ✅ Faster than manual implementation
- ✅ Centralized design system for easy maintenance
- ✅ Type-safe styling with TypeScript

**Key Architecture Decisions:**
- **App Router**: Next.js 14+ for modern routing and layouts
- **Vanilla Extract**: Zero-runtime CSS-in-JS with TypeScript support
- **Centralized Design System**: Single source of truth in `design-system.css.ts`
- **Component Separation**: Components in `app/components/`, styles in `styles/`
- **Type Safety**: Full TypeScript support across components and styles

**Author:** Implemented with GitHub Copilot + MCP Zeplin  
**Date:** December 2025

### Ejemplo 1: Header Component

**Paso 1 - Extraer especificaciones:**
```
Generate a component from the "Header" layer in this screen: https://zpl.io/adPNZ5R
```

**Paso 2 - Crear estilos:**
```typescript
// frontend/styles/header.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './design-system.css';

export const header = style({
  width: '100%',
  height: '50px',
  backgroundColor: vars.color.white,
  boxShadow: '0 2px 0 0 rgb(218, 218, 218)',
  position: 'sticky',
  top: 0,
  zIndex: 100,
});

export const title = style({
  fontFamily: vars.font.montserrat,
  fontSize: '18px',
  fontWeight: 700,
  color: vars.color.greenTeal,
});
```

**Paso 3 - Crear componente:**
```typescript
// frontend/app/components/Header.tsx
import React from 'react';
import * as styles from '../../styles/header.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>SWStarter</h1>
    </header>
  );
}
```

### Ejemplo 2: SearchContainer + Input + Button

**Paso 1 - Extraer múltiples capas:**
```
Generate a component from the "SearchContainer" layer in this screen: https://zpl.io/adPNZ5R
Generate a component from the "Rectangle" layer in this screen: https://zpl.io/adPNZ5R (input)
Generate a component from the "SearchButton-Disabled" layer in this screen: https://zpl.io/adPNZ5R
```

**Paso 2 - Crear estilos consolidados:**
```typescript
// frontend/styles/searchForm.css.ts
export const SearchContainer = style({
  width: '410px',
  height: '230px',
  padding: '30px',
  borderRadius: '4px',
  boxShadow: '0 1px 2px 0 rgba(132, 132, 132, 0.75)',
  border: `1px solid ${vars.color.greyBorder}`,
  backgroundColor: vars.color.white,
});

export const input = style({
  width: '100%',
  height: '40px',
  padding: '0 12px',
  border: `1px solid ${vars.color.pinkishGrey}`,
  borderRadius: '4px',
  boxShadow: 'inset 0 1px 3px 0 rgba(132, 132, 132, 0.75)',
});

export const btn = style({
  background: vars.color.greenTeal,
  color: vars.color.white,
  height: '34px',
  borderRadius: '20px',
  fontWeight: 700,
  width: '100%',
});
```

### Ejemplo 3: Results Container con Items

**Paso 1 - Extraer contenedor:**
```
Generate a component from the "MatchesBG" layer in this screen: https://zpl.io/adPNZ5R
```

**Paso 2 - Prompt para items de resultados:**
```
Crea estilos para los items de resultados con:
- Separadores entre items (border-bottom pinkishGrey)
- Título: Montserrat 18px bold
- Botón "SEE DETAILS": green-teal, border-radius 20px
```

## Prompts Útiles para Diferentes Casos

### Validar múltiples componentes a la vez:
```
Valida estos componentes y ajusta según Zeplin:
1. Generate a component from the "[LAYER_1]" layer in this screen: [URL]
2. Generate a component from the "[LAYER_2]" layer in this screen: [URL]
```

### Extraer toda una pantalla:
```
Generate a component from the "[SCREEN_NAME]" layer in this screen: [URL]
(sin especificar targetLayerName para obtener toda la pantalla)
```

### Agregar colores al design system:
```
Revisa estos componentes y agrega los colores faltantes al design system:
[listar componentes con colores hardcoded]
```

### Crear variantes de componentes:
```
Crea un componente [Name] con variantes según Zeplin:
- Estado normal: [specs]
- Estado hover: [specs]
- Estado disabled: [specs]
```

## Mejores Prácticas

### 1. Orden de Implementación
1. Header/Layout global
2. Contenedores principales
3. Formularios e inputs
4. Listas y items repetitivos
5. Botones y elementos interactivos

### 2. Design Tokens
- Siempre verifica si existe un token antes de usar valores directos
- Agrupa colores relacionados (ej: todas las variaciones de gris)
- Usa nombres semánticos (greenTeal, pinkishGrey vs color1, color2)

### 3. Componentes Reutilizables
- Extrae componentes pequeños (RadioButton, Button)
- Usa props para variantes (checked, disabled, size)
- Mantén los estilos en archivos .css.ts separados

### 4. Validación con Zeplin
Usa este prompt para validar:
```
Compara estos estilos con Zeplin y ajusta:
[pegar estilos actuales]
Zeplin URL: [URL]
```

## Checklist de Implementación

- [ ] Extraer especificaciones de Zeplin con MCP
- [ ] Agregar colores al design system
- [ ] Crear archivo de estilos .css.ts
- [ ] Crear componente React .tsx
- [ ] Validar dimensiones y espaciados
- [ ] Validar colores y tipografía
- [ ] Validar shadows y borders
- [ ] Probar estados interactivos (hover, focus, disabled)
- [ ] Verificar responsive (si aplica)

## Comandos Útiles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Verificar tipos TypeScript
npm run type-check

# Build de producción
npm run build
```

## Recursos

- [Zeplin Project](https://app.zeplin.io/project/5bd8ab5ecca0bd3794a602e7)
- [Vanilla Extract Docs](https://vanilla-extract.style/)
- [MCP Zeplin Integration](https://github.com/modelcontextprotocol/servers)

## Notas Adicionales

Este workflow fue desarrollado con la asistencia de GitHub Copilot, utilizando el MCP de Zeplin para garantizar que todos los componentes coincidan exactamente con las especificaciones del diseño.

**Ventajas de este enfoque:**
- ✅ Precisión exacta con el diseño
- ✅ Design tokens consistentes
- ✅ Menos errores de implementación
- ✅ Documentación automática de especificaciones
- ✅ Más rápido que implementación manual

**Autor:** Implementado con GitHub Copilot + MCP Zeplin  
**Fecha:** Diciembre 2025
