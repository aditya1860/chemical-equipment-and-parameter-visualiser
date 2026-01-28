# 🔬 ChemEquip Visualizer

**ChemEquip Visualizer** is a high-performance, enterprise-ready web dashboard for visualizing, analyzing, and reporting chemical equipment operational data from CSV datasets.
It integrates **interactive data visualization**, **AI-driven operational intelligence**, and **automated PDF reporting** to enable **data-driven decision-making** in chemical and process industries.

---

## ✨ Key Features

### 📈 Interactive Data Visualization

* Dynamic and responsive charts for monitoring critical equipment parameters such as **flow rate**, **pressure**, and **temperature**
* Real-time data rendering with smooth user interaction

### 🤖 AI-Powered Operational Insights

* Integration with **Google Gemini AI**
* Generates:

  * Operational risk classification (Low / Medium / High)
  * Performance observations
  * Optimization recommendations
  * Preventive maintenance suggestions

### 📊 Advanced Analytics

* Summary statistics
* Distribution analysis
* Equipment-type comparisons for deeper insights

### 📁 CSV Data Import

* Upload and parse structured CSV datasets
* Real-time validation and error handling

### 📄 Automated PDF Reporting

* Export comprehensive analysis reports
* Suitable for documentation, audits, and internal reviews

### 📚 Session History Management

* Save, reload, and review previous analysis sessions
* Local persistence for fast access

### 🔐 User Authentication

* Secure login system
* Designed for enterprise or internal tooling (extensible for production use)

### 📱 Responsive User Interface

* Fully responsive design
* Optimized for desktop, tablet, and mobile devices

---

## 🛠️ Technology Stack

### Frontend

* **React 19**
* **TypeScript**
* **Vite**

### UI & Data Visualization

* **Recharts**
* **Tailwind CSS**
* **Lucide React**

### AI Integration

* **Google Gemini API** (`@google/genai`)

### Build & Tooling

* **Vite**
* **npm**

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** v18.0 or higher
* **Google Gemini API Key** (from Google AI Studio)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd copy-of-chemequip-visualizer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the project root:

   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**

   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
copy-of-chemequip-visualizer/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx      # Main analytics dashboard
│   │   ├── Layout.tsx         # Application layout & navigation
│   │   ├── Login.tsx          # Authentication module
│   │   └── HistoryView.tsx    # Session history viewer
│   ├── services/
│   │   ├── dataService.ts     # CSV parsing & data utilities
│   │   └── geminiService.ts   # Gemini AI integration
│   ├── types.ts               # Global TypeScript definitions
│   └── App.tsx                # Application entry point
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 📊 CSV Data Format

The application expects CSV files in the following format:

```
Equipment Name,Type,Flowrate,Pressure,Temperature
Heat Exchanger 01,Exchanger,450.5,12.5,85.2
Distillation Column A,Tower,1200.0,4.2,165.0
```

---

## 📘 Usage Guide

1. **Login**
   Use default credentials (`Admin / password`) or extend authentication logic.

2. **Upload Dataset**
   Upload a CSV file using drag-and-drop or file selector.

3. **Analyze Data**
   Explore interactive charts and AI-generated insights.

4. **Generate Reports**
   Export detailed PDF reports for sharing or documentation.

5. **Review History**
   Access previous analysis sessions from the history panel.

---

## 🤖 AI Capabilities

Powered by **Gemini 1.5 Flash**, the system delivers:

* Operational risk classification
* Performance analysis
* Technical optimization recommendations
* Preventive maintenance insights

---

## 🐛 Troubleshooting

### No AI insights displayed

* Verify API key in `.env.local`
* Check browser console for errors
* Ensure an active internet connection

### Environment variables not detected

* Restart the development server after editing `.env.local`

### CSV parsing errors

* Ensure column names and data types match the required schema

### Charts not rendering

* Clear browser cache
* Verify all dependencies are installed correctly

---

## 🧪 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run preview   # Preview production build
```

---

## 🔒 Security Considerations

* Do **not** commit `.env.local` to version control
* Session history uses `localStorage` (not production-ready)
* Implement secure authentication and HTTPS for production deployments

---

## 🌐 Browser Compatibility

* Chrome 90+
* Firefox 88+
* Safari 14+
* Microsoft Edge 90+

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 🌍 Live Demo

🔗 **[https://chemical-equipment-and-parameter-vi.vercel.app/)**

---

## 📧 Support

For issues, questions, or feature requests, please open an issue on the GitHub repository.
