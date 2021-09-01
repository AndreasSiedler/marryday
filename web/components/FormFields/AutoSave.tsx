import React, {useCallback, useEffect, useState} from 'react';
import {useFormikContext} from "formik";
import debounce from 'lodash/debounce';

export default function AutoSave({debounceMs = 1000}) {
    const formik = useFormikContext();
    const [isSaved, setIsSaved] = useState(null);
    const debouncedSubmit = useCallback(
        debounce(() => {
            console.log('debouncedSubmit')
            return formik.submitForm().then(() => setIsSaved(true));
        }, debounceMs),
        [formik.submitForm, debounceMs],
    );

    useEffect(() => debouncedSubmit, [debouncedSubmit, formik.values]);

    return (
        <p className="text-center text-success">
            {!!formik.isSubmitting
                ? 'Saving...'
                : isSaved
                    ? 'Your changes saved.'
                    : null}
        </p>
    );
}