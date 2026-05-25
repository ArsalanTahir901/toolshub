'use client'

import { Label } from '@/components/label'

interface GeoFieldsProps {
    geoRegion: string
    geoPlacename: string
    geoLat: string
    geoLng: string
    setGeoRegion: (v: string) => void
    setGeoPlacename: (v: string) => void
    setGeoLat: (v: string) => void
    setGeoLng: (v: string) => void
}

const GeoFields = ({
    geoRegion, geoPlacename, geoLat, geoLng,
    setGeoRegion, setGeoPlacename, setGeoLat, setGeoLng,
}: GeoFieldsProps) => {
    return (
        <div className='space-y-4 rounded-xl border border-zinc-800 p-4'>
            <div className='flex items-center gap-2'>
                <span className='text-sm font-semibold text-zinc-300'>Geo Tags</span>
                <span className='rounded-full border border-zinc-700 px-2 py-0.5 text-xs text-zinc-500'>
                    Local SEO
                </span>
            </div>

            <p className='text-xs text-zinc-500'>
                Associates your page with a physical location. Useful for local businesses and location-specific content.
            </p>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div>
                    <Label htmlFor='geoRegion'>Region</Label>
                    <input
                        type='text'
                        id='geoRegion'
                        value={geoRegion}
                        onChange={(e) => setGeoRegion(e.target.value)}
                        placeholder='US-NY'
                    />
                    <p className='mt-1 mb-0! text-xs text-zinc-600'>ISO 3166-2 format</p>
                </div>

                <div>
                    <Label htmlFor='geoPlacename'>Place Name</Label>
                    <input
                        type='text'
                        id='geoPlacename'
                        value={geoPlacename}
                        onChange={(e) => setGeoPlacename(e.target.value)}
                        placeholder='New York'
                    />
                </div>

                <div>
                    <Label htmlFor='geoLat'>Latitude</Label>
                    <input
                        type='text'
                        id='geoLat'
                        value={geoLat}
                        onChange={(e) => setGeoLat(e.target.value)}
                        placeholder='40.7128'
                    />
                </div>

                <div>
                    <Label htmlFor='geoLng'>Longitude</Label>
                    <input
                        type='text'
                        id='geoLng'
                        value={geoLng}
                        onChange={(e) => setGeoLng(e.target.value)}
                        placeholder='-74.0060'
                    />
                </div>
            </div>
        </div>
    )
}

export default GeoFields