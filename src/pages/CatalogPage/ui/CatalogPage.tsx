import { useEffect, useMemo, useState } from 'react'
import { Filter } from '@widgets/Filter'
import { useTelegramHaptic } from '@features/TelegramHaptic'
import { CardItem } from '@features/CardItem/ui/CardItem'
import { useTelegram } from '@shared/lib'
import type { PipeNomenclature } from '@shared/api/types'
import './CatalogPage.css'

export const CatalogPage = () => {
  useTelegramHaptic()
  const { tg } = useTelegram()
  const [isOpen, setIsOpen] = useState<string | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  // Черновые значения фильтров (UI)
  const [draftFilters, setDraftFilters] = useState({
    stock: [] as string[],
    type: [] as string[],
    diameter: [] as string[],
    wall: [] as string[],
    gost: [] as string[],
    steel: [] as string[],
  })
  // Применённые значения фильтров (используются для списка)
  const [appliedFilters, setAppliedFilters] = useState({
    stock: [] as string[],
    type: [] as string[],
    diameter: [] as string[],
    wall: [] as string[],
    gost: [] as string[],
    steel: [] as string[],
  })

  const toggleDropdown = (id: string) => {
    setIsOpen((prev) => (prev === id ? null : id))
  }

  const toggleFilterValue = (key: keyof typeof draftFilters, value: string) => {
    setDraftFilters((prev) => {
      const exists = prev[key].includes(value)
      const next = exists
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value]
      return { ...prev, [key]: next }
    })
  }

  const display = (key: keyof typeof draftFilters) =>
    draftFilters[key].length ? `${draftFilters[key].length} selected` : 'All'

  const clearAllFilters = () => {
    const empty: {
      stock: string[]
      type: string[]
      diameter: string[]
      wall: string[]
      gost: string[]
      steel: string[]
    } = {
      stock: [],
      type: [],
      diameter: [],
      wall: [],
      gost: [],
      steel: [],
    }
    setDraftFilters({ ...empty })
    setAppliedFilters({ ...empty })
    setIsOpen(null)
  }

  const applyAllFilters = () => {
    setAppliedFilters({ ...draftFilters })
    setIsPanelOpen(false)
    setIsOpen(null)
  }

  const products = useMemo(
    () => [
      {
        id: '1',
        stock: 'msk',
        type: 'seamless',
        diameter: '140',
        wall: '3.5',
        gost: 'ТУ 14-162-68-2000',
        steel: '09Г2С-15',
      },
      {
        id: '2',
        stock: 'spb',
        type: 'welded',
        diameter: '108',
        wall: '4',
        gost: 'ГОСТ 8732-78',
        steel: '20',
      },
      {
        id: '3',
        stock: 'msk',
        type: 'seamless',
        diameter: '76',
        wall: '2',
        gost: 'ГОСТ 8732-78',
        steel: '09Г2С-15',
      },
      {
        id: '4',
        stock: 'nsk',
        type: 'welded',
        diameter: '140',
        wall: '3.5',
        gost: 'ГОСТ 8732-78',
        steel: '20',
      },
      {
        id: '5',
        stock: 'msk',
        type: 'seamless',
        diameter: '159',
        wall: '5',
        gost: 'ТУ 14-162-68-2000',
        steel: '09Г2С-15',
      },
    ],
    [],
  )

  const matches = (values: string[], v: string) =>
    values.length ? values.includes(v) : true

  const filtered = products.filter(
    (p) =>
      matches(appliedFilters.stock, p.stock) &&
      matches(appliedFilters.type, p.type) &&
      matches(appliedFilters.diameter, p.diameter) &&
      matches(appliedFilters.wall, p.wall) &&
      matches(appliedFilters.gost, p.gost) &&
      matches(appliedFilters.steel, p.steel),
  )

  // Show Telegram Main/Secondary buttons:
  // - на мобильных: когда панель открыта и есть выбор
  // - на >=768px: всегда, если есть выбор
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (!tg || !tg.MainButton || !tg.SecondaryButton) {
      return
    }

    const handleApply = () => applyAllFilters()

    const handleClear = () => {
      clearAllFilters()
    }

    const hasAnyDraftSelected = Object.values(draftFilters).some(
      (arr) => arr.length > 0,
    )
    const shouldShow = hasAnyDraftSelected && (isPanelOpen || !isMobile)

    if (shouldShow) {
      tg.MainButton.setText('Применить фильтры')
      tg.MainButton.show()
      tg.MainButton.onClick(handleApply)

      tg.SecondaryButton.setText('Сбросить фильтры')
      tg.SecondaryButton.show()
      tg.SecondaryButton.onClick(handleClear)
    } else {
      tg.MainButton.hide()
      tg.SecondaryButton.hide()
    }

    return () => {
      try {
        tg.MainButton.offClick(handleApply)
        tg.SecondaryButton.offClick(handleClear)
      } catch {
        // noop for SDKs without offClick
      }
    }
  }, [isPanelOpen, draftFilters])

  return (
    <div className="catalog-page">
      <div className={`filters-bar ${isPanelOpen ? 'open' : ''}`}>
        <button
          className="filters-toggle"
          onClick={() => setIsPanelOpen((prev) => !prev)}
          aria-expanded={isPanelOpen}
        >
          Фильтры
        </button>
        <div className={`filters-row ${isPanelOpen ? 'open' : ''}`}>
          <Filter
            label="Склад"
            value="stock"
            selectedValues={draftFilters.stock}
            displayValue={display('stock')}
            isOpen={isOpen === 'stock'}
            onToggle={() => toggleDropdown('stock')}
            onSelect={(v) => toggleFilterValue('stock', v)}
            options={[
              { label: 'Москва', value: 'msk' },
              { label: 'Санкт‑Петербург', value: 'spb' },
              { label: 'Новосибирск', value: 'nsk' },
            ]}
          />
          <Filter
            label="Вид продукции"
            value="type"
            selectedValues={draftFilters.type}
            displayValue={display('type')}
            isOpen={isOpen === 'type'}
            onToggle={() => toggleDropdown('type')}
            onSelect={(v) => toggleFilterValue('type', v)}
            options={[
              { label: 'Бесшовные', value: 'seamless' },
              { label: 'Сварные', value: 'welded' },
            ]}
          />
          <Filter
            label="Диаметр"
            value="diameter"
            selectedValues={draftFilters.diameter}
            displayValue={display('diameter')}
            isOpen={isOpen === 'diameter'}
            onToggle={() => toggleDropdown('diameter')}
            onSelect={(v) => toggleFilterValue('diameter', v)}
            options={[
              { label: '76 мм', value: '76' },
              { label: '108 мм', value: '108' },
              { label: '140 мм', value: '140' },
              { label: '159 мм', value: '159' },
            ]}
          />
          <Filter
            label="Стенка"
            value="wall"
            selectedValues={draftFilters.wall}
            displayValue={display('wall')}
            isOpen={isOpen === 'wall'}
            onToggle={() => toggleDropdown('wall')}
            onSelect={(v) => toggleFilterValue('wall', v)}
            options={[
              { label: '2 мм', value: '2' },
              { label: '3.5 мм', value: '3.5' },
              { label: '4 мм', value: '4' },
              { label: '5 мм', value: '5' },
            ]}
          />
          <Filter
            label="ГОСТ"
            value="gost"
            selectedValues={draftFilters.gost}
            displayValue={display('gost')}
            isOpen={isOpen === 'gost'}
            onToggle={() => toggleDropdown('gost')}
            onSelect={(v) => toggleFilterValue('gost', v)}
            options={[
              { label: 'ГОСТ 8732-78', value: 'ГОСТ 8732-78' },
              { label: 'ТУ 14-162-68-2000', value: 'ТУ 14-162-68-2000' },
            ]}
          />
          <Filter
            label="Марка стали"
            value="steel"
            selectedValues={draftFilters.steel}
            displayValue={display('steel')}
            isOpen={isOpen === 'steel'}
            onToggle={() => toggleDropdown('steel')}
            onSelect={(v) => toggleFilterValue('steel', v)}
            options={[
              { label: '09Г2С-15', value: '09Г2С-15' },
              { label: '20', value: '20' },
            ]}
          />
        </div>
      </div>

      <div className="catalog-grid">
        {filtered.map((p) => {
          const product: PipeNomenclature = {
            Id: p.id,
            CategoryId: '',
            TypeId: p.id,
            IDTypeNew: p.id,
            ProductionType: p.type,
            IDFunctionType: '',
            Name: `Труба ${p.diameter}×${p.wall} • ${p.steel} • ${p.gost}`,
            Gost: p.gost,
            FormOfLength: '',
            Manufacturer: 'Производитель',
            SteelGrade: p.steel,
            Diameter: Number(p.diameter),
            ProfileSize2: 0,
            PipeWallThickness: Number(p.wall),
            Status: 1,
            Koef: 0,
          }
          return <CardItem key={p.id} product={product} />
        })}
      </div>
    </div>
  )
}
