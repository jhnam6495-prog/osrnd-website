/**
 * LanguageContext — src/i18n/index.js에서 re-export (하위 호환)
 *
 * 기존 컴포넌트들이 import { useLanguage, t } from '../../contexts/LanguageContext'
 * 패턴을 사용 중이므로 이 파일은 그대로 유지하되 실제 구현은 i18n/index.js에 위치.
 */
export { LanguageProvider, useLanguage, useTranslation, t } from '../i18n/index.jsx'
