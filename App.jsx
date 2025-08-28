import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, Clock, Target, Globe, ChevronDown } from 'lucide-react';

const AIGroceryROICalculator = () => {
  // Language and currency state
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');

  // Currency configurations
  const currencies = {
    USD: { symbol: '$', position: 'before', decimals: 2, thousandSep: ',', decimalSep: '.' },
    EUR: { symbol: '€', position: 'after', decimals: 2, thousandSep: '.', decimalSep: ',' },
    MXN: { symbol: '$', position: 'before', decimals: 2, thousandSep: ',', decimalSep: '.' },
    PAB: { symbol: 'B/.', position: 'before', decimals: 2, thousandSep: ',', decimalSep: '.' },
    ARS: { symbol: '$', position: 'before', decimals: 2, thousandSep: '.', decimalSep: ',' },
    BRL: { symbol: 'R$', position: 'before', decimals: 2, thousandSep: '.', decimalSep: ',' }
  };

  // Market configurations
  const markets = {
    en: { label: 'English', currencies: ['USD'], defaultCurrency: 'USD' },
    es: { label: 'Español', currencies: ['EUR', 'USD', 'MXN', 'PAB', 'ARS'], defaultCurrency: 'USD' },
    pt: { label: 'Português', currencies: ['BRL', 'USD', 'EUR'], defaultCurrency: 'BRL' }
  };

  // Translations
  const translations = {
    en: {
      title: 'AI Grocery ROI Calculator',
      subtitle: 'Interactive Sales Tool - Customize for Each Prospect',
      customerInputs: 'Customer Inputs',
      companyProfile: 'Company Profile',
      currentOperations: 'Current Operations',
      aiImpactProjections: 'AI Impact Projections',
      investmentParameters: 'Investment Parameters',
      financialImpact: 'Financial Impact',
      currentFinancialProfile: 'Current Financial Profile',
      annualBenefitsBreakdown: 'Annual Benefits Breakdown',
      paybackPeriod: 'Payback Period',
      year1ROI: 'Year 1 ROI',
      profitTransformation: 'Profit Transformation',
      investmentSummary: 'Investment Summary',
      executiveSummary: 'Executive Summary',
      // Form fields
      annualGrossRevenue: 'Annual Gross Revenue',
      currentNetMargin: 'Current Net Margin (%)',
      perishablesPercent: 'Perishables % of Revenue',
      numberOfStores: 'Number of Stores',
      currentWasteRate: 'Current Waste Rate on Perishables (%)',
      wasteReduction: 'Waste Reduction (%)',
      marginImprovement: 'Margin Improvement (%)',
      laborSavingsPerStore: 'Labor Savings per Store',
      stockoutReduction: 'Stockout Reduction (%)',
      pocCostPerPhase: 'PoC Cost per Phase',
      annualDeployment: 'Annual Deployment',
      // Results
      annualRevenue: 'Annual Revenue:',
      currentNetProfit: 'Current Net Profit:',
      perishableRevenue: 'Perishable Revenue:',
      annualFoodWaste: 'Annual Food Waste:',
      wasteReductionSavings: 'Waste Reduction Savings:',
      marginImprovementLabel: 'Margin Improvement:',
      laborEfficiency: 'Labor Efficiency:',
      stockoutReductionLabel: 'Stockout Reduction:',
      totalAnnualBenefit: 'Total Annual Benefit:',
      lessAnnualDeployment: 'Less: Annual Deployment Cost:',
      netAnnualBenefit: 'Net Annual Benefit:',
      currentAnnualNetProfit: 'Current Annual Net Profit:',
      newAnnualNetProfit: 'New Annual Net Profit:',
      netProfitIncrease: 'Net Profit Increase:',
      totalPocInvestment: 'Total PoC Investment (2 phases):',
      fiveYearNPV: '5-Year Net Present Value:',
      months: 'months',
      executiveSummaryText: 'Investment of {investment} in AI-powered perishable management delivers {benefit} annual net benefit, increasing net profit by {improvement} with payback in {payback}.'
    },
    es: {
      title: 'Calculadora ROI IA para Supermercados',
      subtitle: 'Herramienta de Ventas Interactiva - Personalizar para Cada Prospecto',
      customerInputs: 'Datos del Cliente',
      companyProfile: 'Perfil de la Empresa',
      currentOperations: 'Operaciones Actuales',
      aiImpactProjections: 'Proyecciones de Impacto IA',
      investmentParameters: 'Parámetros de Inversión',
      financialImpact: 'Impacto Financiero',
      currentFinancialProfile: 'Perfil Financiero Actual',
      annualBenefitsBreakdown: 'Desglose de Beneficios Anuales',
      paybackPeriod: 'Período de Recuperación',
      year1ROI: 'ROI Año 1',
      profitTransformation: 'Transformación de Ganancias',
      investmentSummary: 'Resumen de Inversión',
      executiveSummary: 'Resumen Ejecutivo',
      // Form fields
      annualGrossRevenue: 'Ingresos Brutos Anuales',
      currentNetMargin: 'Margen Neto Actual (%)',
      perishablesPercent: 'Perecederos % de Ingresos',
      numberOfStores: 'Número de Tiendas',
      currentWasteRate: 'Tasa Actual de Desperdicio en Perecederos (%)',
      wasteReduction: 'Reducción de Desperdicio (%)',
      marginImprovement: 'Mejora de Margen (%)',
      laborSavingsPerStore: 'Ahorro de Mano de Obra por Tienda',
      stockoutReduction: 'Reducción de Faltantes (%)',
      pocCostPerPhase: 'Costo PoC por Fase',
      annualDeployment: 'Despliegue Anual',
      // Results
      annualRevenue: 'Ingresos Anuales:',
      currentNetProfit: 'Ganancia Neta Actual:',
      perishableRevenue: 'Ingresos de Perecederos:',
      annualFoodWaste: 'Desperdicio Anual de Alimentos:',
      wasteReductionSavings: 'Ahorro por Reducción de Desperdicio:',
      marginImprovementLabel: 'Mejora de Margen:',
      laborEfficiency: 'Eficiencia Laboral:',
      stockoutReductionLabel: 'Reducción de Faltantes:',
      totalAnnualBenefit: 'Beneficio Anual Total:',
      lessAnnualDeployment: 'Menos: Costo Anual de Despliegue:',
      netAnnualBenefit: 'Beneficio Anual Neto:',
      currentAnnualNetProfit: 'Ganancia Neta Anual Actual:',
      newAnnualNetProfit: 'Nueva Ganancia Neta Anual:',
      netProfitIncrease: 'Incremento de Ganancia Neta:',
      totalPocInvestment: 'Inversión Total PoC (2 fases):',
      fiveYearNPV: 'Valor Presente Neto 5 Años:',
      months: 'meses',
      executiveSummaryText: 'La inversión de {investment} en gestión de perecederos con IA entrega {benefit} de beneficio anual neto, aumentando la ganancia neta en {improvement} con recuperación en {payback}.'
    },
    pt: {
      title: 'Calculadora ROI IA para Supermercados',
      subtitle: 'Ferramenta de Vendas Interativa - Personalizar para Cada Prospecto',
      customerInputs: 'Dados do Cliente',
      companyProfile: 'Perfil da Empresa',
      currentOperations: 'Operações Atuais',
      aiImpactProjections: 'Projeções de Impacto IA',
      investmentParameters: 'Parâmetros de Investimento',
      financialImpact: 'Impacto Financeiro',
      currentFinancialProfile: 'Perfil Financeiro Atual',
      annualBenefitsBreakdown: 'Detalhamento de Benefícios Anuais',
      paybackPeriod: 'Período de Payback',
      year1ROI: 'ROI Ano 1',
      profitTransformation: 'Transformação de Lucro',
      investmentSummary: 'Resumo do Investimento',
      executiveSummary: 'Resumo Executivo',
      // Form fields
      annualGrossRevenue: 'Receita Bruta Anual',
      currentNetMargin: 'Margem Líquida Atual (%)',
      perishablesPercent: 'Perecíveis % da Receita',
      numberOfStores: 'Número de Lojas',
      currentWasteRate: 'Taxa Atual de Desperdício em Perecíveis (%)',
      wasteReduction: 'Redução de Desperdício (%)',
      marginImprovement: 'Melhoria de Margem (%)',
      laborSavingsPerStore: 'Economia de Mão de Obra por Loja',
      stockoutReduction: 'Redução de Falta de Estoque (%)',
      pocCostPerPhase: 'Custo PoC por Fase',
      annualDeployment: 'Implantação Anual',
      // Results
      annualRevenue: 'Receita Anual:',
      currentNetProfit: 'Lucro Líquido Atual:',
      perishableRevenue: 'Receita de Perecíveis:',
      annualFoodWaste: 'Desperdício Anual de Alimentos:',
      wasteReductionSavings: 'Economia com Redução de Desperdício:',
      marginImprovementLabel: 'Melhoria de Margem:',
      laborEfficiency: 'Eficiência do Trabalho:',
      stockoutReductionLabel: 'Redução de Falta de Estoque:',
      totalAnnualBenefit: 'Benefício Anual Total:',
      lessAnnualDeployment: 'Menos: Custo Anual de Implantação:',
      netAnnualBenefit: 'Benefício Anual Líquido:',
      currentAnnualNetProfit: 'Lucro Líquido Anual Atual:',
      newAnnualNetProfit: 'Novo Lucro Líquido Anual:',
      netProfitIncrease: 'Aumento do Lucro Líquido:',
      totalPocInvestment: 'Investimento Total PoC (2 fases):',
      fiveYearNPV: 'Valor Presente Líquido 5 Anos:',
      months: 'meses',
      executiveSummaryText: 'Investimento de {investment} em gestão de perecíveis com IA entrega {benefit} de benefício anual líquido, aumentando o lucro líquido em {improvement} com payback em {payback}.'
    }
  };

  // Get current translations
  const t = translations[language] || translations.en;

  // Input state with currency-appropriate defaults
  const [inputs, setInputs] = useState({
    grossRevenue: 50,
    netMargin: 3.0,
    perishablePercentage: 60,
    currentWasteRate: 10,
    numberOfStores: 5,
    wasteReductionRate: 35,
    marginImprovementRate: 1.5,
    laborSavingsPerStore: 25,
    stockoutReductionRate: 2.0,
    pocCostPerPhase: 75,
    annualDeploymentCost: 200
  });

  // Results state - initialized with defaults
  const [results, setResults] = useState({
    grossRevenueValue: 0,
    currentNetProfit: 0,
    perishableRevenue: 0,
    currentWasteValue: 0,
    wasteReductionSavings: 0,
    marginImprovement: 0,
    laborSavings: 0,
    stockoutReduction: 0,
    totalAnnualBenefit: 0,
    netAnnualBenefit: 0,
    totalPocInvestment: 0,
    paybackMonths: 0,
    roiYear1: 0,
    netProfitImprovement: 0,
    fiveYearNPV: 0,
    newNetProfit: 0
  });

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    // Auto-select default currency for the language
    const defaultCurrency = markets[newLanguage]?.defaultCurrency;
    if (defaultCurrency) {
      setCurrency(defaultCurrency);
    }
  };

  // Currency formatting function
  const formatCurrency = (value) => {
    if (value === undefined || value === null || isNaN(value)) {
      const currencyInfo = currencies[currency];
      return currencyInfo.position === 'before' ? `${currencyInfo.symbol}0` : `0${currencyInfo.symbol}`;
    }

    const currencyInfo = currencies[currency];
    let formattedValue;

    if (value >= 1000000) {
      formattedValue = (value / 1000000).toLocaleString(language, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      }) + 'M';
    } else if (value >= 1000) {
      formattedValue = (value / 1000).toLocaleString(language, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }) + 'K';
    } else {
      formattedValue = value.toLocaleString(language, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }

    return currencyInfo.position === 'before' ? 
      `${currencyInfo.symbol}${formattedValue}` : 
      `${formattedValue}${currencyInfo.symbol}`;
  };

  const formatPercent = (value) => {
    if (value === undefined || value === null || isNaN(value)) {
      return '0.0%';
    }
    return `${value.toFixed(1)}%`;
  };

  // Calculate results whenever inputs change
  useEffect(() => {
    const {
      grossRevenue,
      netMargin,
      perishablePercentage,
      currentWasteRate,
      numberOfStores,
      wasteReductionRate,
      marginImprovementRate,
      laborSavingsPerStore,
      stockoutReductionRate,
      pocCostPerPhase,
      annualDeploymentCost
    } = inputs;

    // Current financial profile
    const grossRevenueValue = grossRevenue * 1000000;
    const currentNetProfit = grossRevenueValue * (netMargin / 100);
    const perishableRevenue = grossRevenueValue * (perishablePercentage / 100);
    const currentWasteValue = perishableRevenue * (currentWasteRate / 100);

    // Benefits calculations
    const wasteReductionSavings = currentWasteValue * (wasteReductionRate / 100);
    const marginImprovement = perishableRevenue * (marginImprovementRate / 100);
    const laborSavings = laborSavingsPerStore * 1000 * numberOfStores;
    const stockoutReduction = perishableRevenue * (stockoutReductionRate / 100);

    const totalAnnualBenefit = wasteReductionSavings + marginImprovement + laborSavings + stockoutReduction;
    const annualDeploymentCostValue = annualDeploymentCost * 1000;
    const netAnnualBenefit = totalAnnualBenefit - annualDeploymentCostValue;

    // Investment calculations
    const totalPocInvestment = pocCostPerPhase * 1000 * 2; // Two phases
    const paybackMonths = totalPocInvestment / (netAnnualBenefit / 12);
    const roiYear1 = (netAnnualBenefit / totalPocInvestment) * 100;
    const netProfitImprovement = (netAnnualBenefit / currentNetProfit) * 100;

    // 5-year calculations
    const fiveYearBenefits = netAnnualBenefit * 5;
    const fiveYearInvestment = totalPocInvestment + (annualDeploymentCostValue * 5);
    const fiveYearNPV = fiveYearBenefits - fiveYearInvestment;

    setResults({
      grossRevenueValue,
      currentNetProfit,
      perishableRevenue,
      currentWasteValue,
      wasteReductionSavings,
      marginImprovement,
      laborSavings,
      stockoutReduction,
      totalAnnualBenefit,
      netAnnualBenefit,
      totalPocInvestment,
      paybackMonths,
      roiYear1,
      netProfitImprovement,
      fiveYearNPV,
      newNetProfit: currentNetProfit + netAnnualBenefit
    });
  }, [inputs, currency, language]);

  const handleInputChange = (field, value) => {
    const numValue = parseFloat(value);
    setInputs(prev => ({
      ...prev,
      [field]: isNaN(numValue) ? 0 : numValue
    }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calculator className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">{t.title}</h1>
                <p className="text-blue-100">{t.subtitle}</p>
              </div>
            </div>
            
            {/* Language and Currency Selector */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="bg-blue-700 text-white border border-blue-500 rounded px-2 py-1 text-sm"
                >
                  {Object.entries(markets).map(([code, info]) => (
                    <option key={code} value={code}>{info.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-blue-700 text-white border border-blue-500 rounded px-2 py-1 text-sm"
                >
                  {markets[language]?.currencies.map(curr => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Input Panel */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">{t.customerInputs}</h2>
            
            {/* Company Profile */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-3">{t.companyProfile}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {t.annualGrossRevenue} (M)
                  </label>
                  <input
                    type="number"
                    value={inputs.grossRevenue}
                    onChange={(e) => handleInputChange('grossRevenue', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {t.currentNetMargin}
                  </label>
                  <input
                    type="number"
                    value={inputs.netMargin}
                    onChange={(e) => handleInputChange('netMargin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {t.perishablesPercent}
                  </label>
                  <input
                    type="number"
                    value={inputs.perishablePercentage}
                    onChange={(e) => handleInputChange('perishablePercentage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    step="1"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {t.numberOfStores}
                  </label>
                  <input
                    type="number"
                    value={inputs.numberOfStores}
                    onChange={(e) => handleInputChange('numberOfStores', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    step="1"
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Current Operations */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-3">{t.currentOperations}</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {t.currentWasteRate}
                  </label>
                  <input
                    type="number"
                    value={inputs.currentWasteRate}
                    onChange={(e) => handleInputChange('currentWasteRate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    step="0.5"
                    min="0"
                    max="50"
                  />
                </div>
              </div>
            </div>

            {/* AI Impact Assumptions */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-3">{t.aiImpactProjections}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    {t.wasteReduction}
                  </label>
                  <input
                    type="number"
                    value={inputs.wasteReductionRate}
                    onChange={(e) => handleInputChange('wasteReductionRate', e.target.value)}
                    className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    step="1"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    {t.marginImprovement}
                  </label>
                  <input
                    type="number"
                    value={inputs.marginImprovementRate}
                    onChange={(e) => handleInputChange('marginImprovementRate', e.target.value)}
                    className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    {t.laborSavingsPerStore} (K)
                  </label>
                  <input
                    type="number"
                    value={inputs.laborSavingsPerStore}
                    onChange={(e) => handleInputChange('laborSavingsPerStore', e.target.value)}
                    className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    step="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    {t.stockoutReduction}
                  </label>
                  <input
                    type="number"
                    value={inputs.stockoutReductionRate}
                    onChange={(e) => handleInputChange('stockoutReductionRate', e.target.value)}
                    className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            {/* Investment Parameters */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-3">{t.investmentParameters}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">
                    {t.pocCostPerPhase} (K)
                  </label>
                  <input
                    type="number"
                    value={inputs.pocCostPerPhase}
                    onChange={(e) => handleInputChange('pocCostPerPhase', e.target.value)}
                    className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500"
                    step="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">
                    {t.annualDeployment} (K)
                  </label>
                  <input
                    type="number"
                    value={inputs.annualDeploymentCost}
                    onChange={(e) => handleInputChange('annualDeploymentCost', e.target.value)}
                    className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500"
                    step="10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">{t.financialImpact}</h2>

            {/* Current State */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-3">{t.currentFinancialProfile}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">{t.annualRevenue}</span>
                  <div className="font-semibold text-gray-800">{formatCurrency(results.grossRevenueValue)}</div>
                </div>
                <div>
                  <span className="text-gray-600">{t.currentNetProfit}</span>
                  <div className="font-semibold text-gray-800">{formatCurrency(results.currentNetProfit)}</div>
                </div>
                <div>
                  <span className="text-gray-600">{t.perishableRevenue}</span>
                  <div className="font-semibold text-gray-800">{formatCurrency(results.perishableRevenue)}</div>
                </div>
                <div>
                  <span className="text-gray-600">{t.annualFoodWaste}</span>
                  <div className="font-semibold text-red-600">{formatCurrency(results.currentWasteValue)}</div>
                </div>
              </div>
            </div>

            {/* Annual Benefits */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {t.annualBenefitsBreakdown}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">{t.wasteReductionSavings}</span>
                  <span className="font-semibold text-green-800">{formatCurrency(results.wasteReductionSavings)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">{t.marginImprovementLabel}</span>
                  <span className="font-semibold text-green-800">{formatCurrency(results.marginImprovement)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">{t.laborEfficiency}</span>
                  <span className="font-semibold text-green-800">{formatCurrency(results.laborSavings)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">{t.stockoutReductionLabel}</span>
                  <span className="font-semibold text-green-800">{formatCurrency(results.stockoutReduction)}</span>
                </div>
                <hr className="border-green-200" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-green-800">{t.totalAnnualBenefit}</span>
                  <span className="font-bold text-green-800 text-lg">{formatCurrency(results.totalAnnualBenefit)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">{t.lessAnnualDeployment}</span>
                  <span className="text-green-700">-{formatCurrency(inputs.annualDeploymentCost * 1000)}</span>
                </div>
                <div className="flex justify-between items-center bg-green-100 p-2 rounded">
                  <span className="font-bold text-green-800">{t.netAnnualBenefit}</span>
                  <span className="font-bold text-green-800 text-xl">{formatCurrency(results.netAnnualBenefit)}</span>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">{t.paybackPeriod}</h3>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {!results.paybackMonths || isNaN(results.paybackMonths) ? '0' : 
                   results.paybackMonths < 1 ? '<1' : Math.round(results.paybackMonths)} {t.months}
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-purple-800">{t.year1ROI}</h3>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {formatPercent(results.roiYear1)}
                </div>
              </div>
            </div>

            {/* Profit Transformation */}
            <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                {t.profitTransformation}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-yellow-700">{t.currentAnnualNetProfit}</span>
                  <span className="font-semibold text-yellow-800">{formatCurrency(results.currentNetProfit)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-700">{t.newAnnualNetProfit}</span>
                  <span className="font-semibold text-yellow-800">{formatCurrency(results.newNetProfit)}</span>
                </div>
                <div className="flex justify-between items-center bg-yellow-100 p-2 rounded">
                  <span className="font-bold text-yellow-800">{t.netProfitIncrease}</span>
                  <span className="font-bold text-yellow-800">{formatPercent(results.netProfitImprovement)}</span>
                </div>
              </div>
            </div>

            {/* Investment Summary */}
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-semibold text-indigo-800 mb-3">{t.investmentSummary}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-indigo-700">{t.totalPocInvestment}</span>
                  <span className="font-semibold">{formatCurrency(results.totalPocInvestment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-700">{t.fiveYearNPV}</span>
                  <span className="font-bold text-indigo-800">{formatCurrency(results.fiveYearNPV)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Summary */}
        <div className="bg-gray-100 p-6 border-t">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.executiveSummary}</h3>
            <p className="text-gray-600 max-w-4xl mx-auto">
              {t.executiveSummaryText
                .replace('{investment}', formatCurrency(results.totalPocInvestment))
                .replace('{benefit}', formatCurrency(results.netAnnualBenefit))
                .replace('{improvement}', formatPercent(results.netProfitImprovement))
                .replace('{payback}', !results.paybackMonths || isNaN(results.paybackMonths) ? '0 ' + t.months : 
                        results.paybackMonths < 1 ? (language === 'es' ? 'menos de 1 mes' : language === 'pt' ? 'menos de 1 mês' : 'less than 1 month') : 
                        `${Math.round(results.paybackMonths)} ${t.months}`)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGroceryROICalculator;