<?php

namespace PhpOffice\PhpSpreadsheet;

use PhpOffice\PhpSpreadsheet\Calculation\Category;
use PhpOffice\PhpSpreadsheet\Calculation\Functions;
use ReflectionClass;
use UnexpectedValueException;

class DocumentGenerator
{
    /**
     * @param array[] $phpSpreadsheetFunctions
     */
    public static function generateFunctionListByCategory(array $phpSpreadsheetFunctions): string
    {
        $result = "# Function list by category\n";
        foreach (self::getCategories() as $categoryConstant => $category) {
            $result .= "\n";
            $result .= "## {$categoryConstant}\n";
            $result .= "\n";
            $lengths = [20, 42];
            $result .= self::tableRow($lengths, ['Excel Function', 'PhpSpreadsheet Function']) . "\n";
            $result .= self::tableRow($lengths, null) . "\n";
            foreach ($phpSpreadsheetFunctions as $excelFunction => $functionInfo) {
                if ($category === $functionInfo['category']) {
                    $phpFunction = self::getPhpSpreadsheetFunctionText($functionInfo['functionCall']);
                    $result .= self::tableRow($lengths, [$excelFunction, $phpFunction]) . "\n";
                }
            }
        }

        return $result;
    }

    private static function getCategories()//array
    {
        return (new ReflectionClass(Category::class))->getConstants();
    }

    private static function tableRow(array $lengths, $values = null): string
    {
        $result = '';
//        foreach (array_map(null, $lengths, (isset($values)? $values : [])) as $i => [$length, $value]) {
        foreach (array_map(null, $lengths, (isset($values)? $values : [])) as $i => $val) {
            $pad = $val[1] === null ? '-' : ' ';
            if ($i > 0) {
                $result .= '|' . $pad;
            }
            $result .= str_pad(isset($val[1]) ? $val[1] : '', $val[0], $pad);
        }

        return rtrim($result, ' ');
    }

    private static function getPhpSpreadsheetFunctionText($functionCall): string
    {
        if (is_string($functionCall)) {
            return $functionCall;
        }
        if ($functionCall === [Functions::class, 'DUMMY']) {
            return '**Not yet Implemented**';
        }
        if (is_array($functionCall)) {
            return "\\{$functionCall[0]}::{$functionCall[1]}";
        }

        throw new UnexpectedValueException(
            '$functionCall is of type ' . gettype($functionCall) . '. string or array expected'
        );
    }

    /**
     * @param array[] $phpSpreadsheetFunctions
     */
    public static function generateFunctionListByName(array $phpSpreadsheetFunctions): string
    {
        $categoryConstants = array_flip(self::getCategories());
        $result = "# Function list by name\n";
        $lastAlphabet = null;
        foreach ($phpSpreadsheetFunctions as $excelFunction => $functionInfo) {
            $lengths = [20, 31, 42];
            if ($lastAlphabet !== $excelFunction[0]) {
                $lastAlphabet = $excelFunction[0];
                $result .= "\n";
                $result .= "## {$lastAlphabet}\n";
                $result .= "\n";
                $result .= self::tableRow($lengths, ['Excel Function', 'Category', 'PhpSpreadsheet Function']) . "\n";
                $result .= self::tableRow($lengths, null) . "\n";
            }
            $category = $categoryConstants[$functionInfo['category']];
            $phpFunction = self::getPhpSpreadsheetFunctionText($functionInfo['functionCall']);
            $result .= self::tableRow($lengths, [$excelFunction, $category, $phpFunction]) . "\n";
        }

        return $result;
    }
}
