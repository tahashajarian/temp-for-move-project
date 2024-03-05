import {useEffect, useMemo, useRef, useState} from "react";
import useOutsideClicked from "../../../../hooks/useOutsideClicked";
import useAxios from "../../../../request/hooks/useAxios";
import {SelectOptionType, SelectProps} from "../Select";
import {multiSelectInputWrapperId} from "../InputForMultiSelectMode";
import {inputWrapperId} from "../../Input/Input";
import elementIsVisibleInViewport from "../../../../utils/elementIsVisibleInViewport";


function useSelect({apiAddress, onSelect, options, value, name, mode}: SelectProps) {

  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)
  const [optionsList, setOptionsList] = useState<SelectOptionType[]>(options || [])

  const inputWrapperRef = useRef<HTMLDivElement | null>(null)

  useOutsideClicked(inputWrapperRef, closeDropDown, [value])

  const [listResponse, getListRequest] = useAxios()

  useEffect(function () {
    if (!apiAddress) return
    getListRequest({url: apiAddress}).then(response => {
      setOptionsList(response.data.result)
    })
  }, [apiAddress])

  function toggleDropDown() {
    setDropDownOpen(prev => {
      if (prev) {
        setCurrentValueToInput()
        setQuery('')
      }
      return !prev
    })
  }

  function closeDropDown() {
    setCurrentValueToInput()
    setQuery('')
    setDropDownOpen(false)
  }

  function optionOnClick(e: any, selectValue: SelectOptionType) {
    if (mode === 'multiple') {
      setInputValue('')
      const isExists = value && Boolean(value?.find(item => item.id === selectValue.id))
      if (isExists) {
        onSelect(value?.filter(item => item.id !== selectValue.id) || [])
      } else {
        onSelect([...value || [], selectValue])
      }
    } else {
      onSelect(selectValue)
    }
    setQuery('')
    mode == null && setDropDownOpen(false)
    e.stopPropagation()
  }

  const [query, setQuery] = useState('')

  function setInputValue(inputValue: string) {
    const element: HTMLInputElement = document.querySelector(`#${name}`)!
    if (!element) return
    element.value = inputValue
    element.title = inputValue
  }

  function setCurrentValueToInput() {
    if (mode === 'multiple') {
    } else {
      if (value === '') {
        setInputValue('')
      } else if (value != null) {
        value != null && setInputValue(value?.name || '')
      }
    }
  }

  useEffect(() => {
    setCurrentValueToInput()
  }, [value]);

  function onQuery(e: any) {
    const targetValue = e.target.value.trim().toLowerCase()
    setQuery(targetValue)
    setInputValue(targetValue)
    !dropDownOpen && setDropDownOpen(true)
  }

  const filteredOptions = useMemo(function () {
    return optionsList.filter(item => item.name.toLowerCase().includes(query))
  }, [optionsList, query])

  function onRemoveHandler(tagId: SelectOptionType['id']) {
    if (mode == null) return
    const tagsInstance = value?.filter(item => item.id !== tagId)
    tagsInstance && onSelect(tagsInstance)
  }

  function clearInput() {
    setDropDownOpen(false)
    setInputValue('')
    setQuery('')
    if (mode === 'multiple') {
      onSelect([])
    } else {
      onSelect('')
    }
  }

  const [dropDownStyle, setDropDownStyle] = useState<any>()
  const dropDownRef = useRef<HTMLDivElement>(null)

  function getInputPosition() {
    const inputElement = inputWrapperRef?.current?.querySelector(mode === 'multiple' ? `#${multiSelectInputWrapperId}` : `#${inputWrapperId}`)
    const position = inputElement?.getBoundingClientRect()
    return position
  }

  function calculateDropDownStyle() {
    const inputWrapperPosition = inputWrapperRef?.current?.getBoundingClientRect()
    const inputPosition = getInputPosition()
    const bodyWidth = document?.body?.clientWidth

    if (!inputWrapperPosition || !inputPosition) return {}

    setDropDownStyle({
      top: inputPosition.bottom + 1,
      right: bodyWidth - inputWrapperPosition?.right,
      width: inputWrapperPosition?.width,
    })
  }

  useEffect(() => {
    if (mode !== 'multiple') return
    setTimeout(calculateDropDownStyle, 200)
  }, [value])

  useEffect(function () {
    calculateDropDownStyle()
  }, [dropDownOpen])

  useEffect(() => {
    if (!dropDownStyle || !dropDownOpen) return

    setTimeout(function () {
      if (!dropDownRef.current) return
      const dropDownIsVisible = elementIsVisibleInViewport(dropDownRef.current)

      const inputPosition = getInputPosition()

      if (dropDownIsVisible || !inputPosition) return
      setDropDownStyle((prev:any) => ({
        top: inputPosition.top - 1,
        right: prev?.right,
        width: prev?.width,
        transform: 'translateY(-100%)'
      }))
    }, 300)
  }, [dropDownStyle]);

  //add label to current value when has not label
  useEffect(() => {
    if (mode !== 'multiple' && value && value?.id !== null && !value?.name && optionsList.length > 0) {
      const currentObjectValue = optionsList.find(item => item.id === value.id)
      currentObjectValue && onSelect(currentObjectValue)
    }
  }, [value, optionsList]);

  return {
    inputWrapperRef, toggleDropDown, loading: listResponse.loading, dropDownOpen, optionsList, optionOnClick,
    onQuery, filteredOptions, onRemoveHandler, clearInput, dropDownStyle, dropDownRef
  }
}

export default useSelect