<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInite108c90eeeb691a483fd2c9fbef7bd07
{
    public static $files = array (
        'c964ee0ededf28c96ebd9db5099ef910' => __DIR__ . '/..' . '/guzzlehttp/promises/src/functions_include.php',
        'a0edc8309cc5e1d60e3047b5df6b7052' => __DIR__ . '/..' . '/guzzlehttp/psr7/src/functions_include.php',
        '37a3dc5111fe8f707ab4c132ef1dbc62' => __DIR__ . '/..' . '/guzzlehttp/guzzle/src/functions_include.php',
    );

    public static $prefixLengthsPsr4 = array (
        'W' => 
        array (
            'WatsonSDK\\Services\\' => 19,
            'WatsonSDK\\Common\\' => 17,
        ),
        'P' => 
        array (
            'Psr\\Http\\Message\\' => 17,
        ),
        'G' => 
        array (
            'GuzzleHttp\\Psr7\\' => 16,
            'GuzzleHttp\\Promise\\' => 19,
            'GuzzleHttp\\' => 11,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'WatsonSDK\\Services\\' => 
        array (
            0 => __DIR__ . '/..' . '/cognitivebuild/watsonphpsdk/Source/Services',
        ),
        'WatsonSDK\\Common\\' => 
        array (
            0 => __DIR__ . '/..' . '/cognitivebuild/watsonphpsdk/Source/Common',
        ),
        'Psr\\Http\\Message\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/http-message/src',
        ),
        'GuzzleHttp\\Psr7\\' => 
        array (
            0 => __DIR__ . '/..' . '/guzzlehttp/psr7/src',
        ),
        'GuzzleHttp\\Promise\\' => 
        array (
            0 => __DIR__ . '/..' . '/guzzlehttp/promises/src',
        ),
        'GuzzleHttp\\' => 
        array (
            0 => __DIR__ . '/..' . '/guzzlehttp/guzzle/src',
        ),
    );

    public static $classMap = array (
        'TwitterAPIExchange' => __DIR__ . '/..' . '/j7mbo/twitter-api-php/TwitterAPIExchange.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInite108c90eeeb691a483fd2c9fbef7bd07::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInite108c90eeeb691a483fd2c9fbef7bd07::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInite108c90eeeb691a483fd2c9fbef7bd07::$classMap;

        }, null, ClassLoader::class);
    }
}
