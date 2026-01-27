# 🔬 ChemEquip Visualizer

**ChemEquip Visualizer** is a high-performance web dashboard designed for **visualizing, analyzing, and reporting chemical equipment operational data** from CSV datasets.
It combines **interactive data visualization**, **AI-powered operational insights**, and **automated PDF reporting** to support data-driven decision-making in chemical and process industries.

---

## ✨ Key Features

* **📈 Interactive Data Visualization**
  Dynamic charts and graphs for monitoring equipment parameters such as flow rate, pressure, and temperature.

* **🤖 AI-Powered Operational Insights**
  Integration with **Google Gemini AI** to generate intelligent recommendations, risk assessments, and performance observations.

* **📊 Advanced Analytics**
  Summary statistics, distribution analysis, and equipment-type comparisons.

* **📁 CSV Data Import**
  Upload and parse structured CSV datasets with real-time validation.

* **📄 Automated PDF Reports**
  Generate and export comprehensive analysis reports for documentation and audits.

* **📚 Session History Management**
  Save, reload, and review previous analysis sessions.

* **🔐 User Authentication**
  Secure login system suitable for enterprise or internal tooling.

* **📱 Responsive UI**
  Fully responsive design optimized for desktop and mobile devices.

---

## 🛠️ Technology Stack

**Frontend**

* React 19
* TypeScript
* Vite

**UI & Visualization**

* Recharts
* Tailwind CSS
* Lucide React

**AI Integration**

* Google Gemini API (`@google/genai`)

**Build & Tooling**

* Vite
* npm

---

## 🚀 Getting Started

### Prerequisites

* Node.js **v18.0 or higher**
* Google Gemini API key (from **Google AI Studio**)

---

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

Create a `.env.local` file in the project root and add:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

4. **Start the development server**

```bash
npm run dev
```

5. Open your browser at:

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
│   │   ├── Layout.tsx         # App layout and navigation
│   │   ├── Login.tsx          # Authentication module
│   │   └── HistoryView.tsx    # Session history viewer
│   ├── services/
│   │   ├── dataService.ts     # CSV parsing and data utilities
│   │   └── geminiService.ts   # Gemini AI integration
│   ├── types.ts               # TypeScript definitions
│   └── App.tsx                # Application entry point
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 📊 CSV Data Format

The application expects CSV files with the following schema:

```csv
Equipment Name,Type,Flowrate,Pressure,Temperature
Heat Exchanger 01,Exchanger,450.5,12.5,85.2
Distillation Column A,Tower,1200.0,4.2,165.0
```

---

## 📘 Usage Guide

1. **Login**
   Use default credentials (`Admin / password`) or extend authentication logic.

2. **Upload Dataset**
   Upload a CSV file via drag-and-drop or file selector.

3. **Analyze Data**
   Explore interactive charts and AI-generated insights.

4. **Generate Reports**
   Export detailed PDF reports for sharing or documentation.

5. **Review History**
   Access previous analysis sessions from the history panel.

---

## 🤖 AI Capabilities

Powered by **Gemini 1.5 Flash**, the system provides:

* Operational risk classification (Low / Medium / High)
* Performance observations
* Technical and optimization recommendations
* Preventive maintenance suggestions

---

## 🐛 Troubleshooting

### Common Issues

* **No AI insights displayed**

  * Verify API key in `.env.local`
  * Check browser console for errors
  * Ensure active internet connection

* **Environment variable not detected**

  * Restart the development server after editing `.env.local`

* **CSV parsing errors**

  * Ensure column names and data types match the required format

* **Charts not rendering**

  * Clear browser cache
  * Verify all dependencies are installed

---

## 🧪 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run preview   # Preview production build
```

---

## 🔒 Security Considerations

* Do **not** commit `.env.local` to version control
* Session history is stored using `localStorage` (not production-ready)
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

## 🙏 Acknowledgments

* Google Gemini API
* Recharts
* Lucide Icons
* Tailwind CSS

---

## 📧 Support

For issues, questions, or feature requests, please open an issue on the GitHub repository.

